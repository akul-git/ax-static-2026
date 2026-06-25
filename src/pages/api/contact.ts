import type { APIRoute } from "astro";
import { z } from "zod";
import nodemailer from "nodemailer";

type Bucket = { count: number; resetAt: number };

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 12;
const MAX_CONTENT_LENGTH = 20_000;
const buckets = new Map<string, Bucket>();
const emailLikePattern = /\b(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/i;
const urlPattern = /(https?:\/\/|www\.)/i;

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  companyName: z.string().trim().min(1).max(140),
  jobTitle: z.string().trim().min(1).max(140),
  workEmail: z.string().trim().email().max(254),
  newsletter: z.enum(["yes"]).optional(),
});

type ContactPayload = z.infer<typeof contactSchema>;

const getClientIp = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const current = buckets.get(ip);

  if (!current || current.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_MAX_REQUESTS) return true;
  current.count += 1;
  return false;
};

const isAllowedOrigin = (request: Request): boolean => {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");

  const allowedOrigins = [requestUrl.origin];
  const extra = import.meta.env.ALLOWED_ORIGINS || "";
  extra
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .forEach((value) => allowedOrigins.push(value));

  return !origin || allowedOrigins.includes(origin);
};

const verifyCaptcha = async (request: Request, formData: FormData, ip: string): Promise<boolean> => {
  const token =
    String(formData.get("h-captcha-response") || "") ||
    String(formData.get("g-recaptcha-response") || "") ||
    String(formData.get("captchaToken") || "");

  const provider = (import.meta.env.CAPTCHA_PROVIDER || "").toLowerCase();

  if (provider === "hcaptcha") {
    const secret = import.meta.env.HCAPTCHA_SECRET || "";
    if (!secret) return true;
    if (!token) return false;

    const body = new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    });

    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  }

  const secret = import.meta.env.RECAPTCHA_SECRET_KEY || "";
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
};

const redirectToContact = (request: Request, status: string) => {
  const url = new URL("/about-us/contact-us", request.url);
  url.searchParams.set("status", status);
  return new Response(null, { status: 303, headers: { Location: url.toString() } });
};

const hasSuspiciousText = (value: string): boolean => {
  return urlPattern.test(value) || emailLikePattern.test(value);
};

const isLikelySpam = (payload: ContactPayload): boolean => {
  return (
    hasSuspiciousText(payload.firstName) ||
    hasSuspiciousText(payload.lastName) ||
    hasSuspiciousText(payload.companyName) ||
    hasSuspiciousText(payload.jobTitle)
  );
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildTransport = () => {
  const host = import.meta.env.SMTP_HOST || "";
  const port = Number(import.meta.env.SMTP_PORT || "587");
  const secure = String(import.meta.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const user = import.meta.env.SMTP_USER || "";
  const pass = import.meta.env.SMTP_PASS || "";

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
};

const sendContactEmail = async (payload: ContactPayload, request: Request, ip: string): Promise<boolean> => {
  const recipient = import.meta.env.CONTACT_FORM_TO || "";
  const fromAddress = import.meta.env.CONTACT_FORM_FROM || import.meta.env.SMTP_FROM || "";

  if (!recipient || !fromAddress) return false;

  const transport = buildTransport();
  if (!transport) return false;

  const origin = request.headers.get("origin") || new URL(request.url).origin;
  const newsletterOptIn = payload.newsletter === "yes" ? "Yes" : "No";
  const subject = `[Contact] ${payload.firstName} ${payload.lastName} - ${payload.companyName}`;

  const safeFirstName = escapeHtml(payload.firstName);
  const safeLastName = escapeHtml(payload.lastName);
  const safeCompany = escapeHtml(payload.companyName);
  const safeJobTitle = escapeHtml(payload.jobTitle);
  const safeEmail = escapeHtml(payload.workEmail);
  const safeNewsletter = escapeHtml(newsletterOptIn);
  const safeIp = escapeHtml(ip);
  const safeOrigin = escapeHtml(origin);

  const text = [
    "New contact form submission",
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Company: ${payload.companyName}`,
    `Job Title: ${payload.jobTitle}`,
    `Work Email: ${payload.workEmail}`,
    `Newsletter Opt-In: ${newsletterOptIn}`,
    `IP: ${ip}`,
    `Origin: ${origin}`,
  ].join("\n");

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
    <p><strong>Company:</strong> ${safeCompany}</p>
    <p><strong>Job Title:</strong> ${safeJobTitle}</p>
    <p><strong>Work Email:</strong> ${safeEmail}</p>
    <p><strong>Newsletter Opt-In:</strong> ${safeNewsletter}</p>
    <hr />
    <p><strong>IP:</strong> ${safeIp}</p>
    <p><strong>Origin:</strong> ${safeOrigin}</p>
  `;

  await transport.sendMail({
    to: recipient,
    from: fromAddress,
    replyTo: payload.workEmail,
    subject,
    text,
    html,
  });

  return true;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isAllowedOrigin(request)) return redirectToContact(request, "origin_error");

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > MAX_CONTENT_LENGTH) return redirectToContact(request, "payload_too_large");

    const ip = getClientIp(request);
    if (isRateLimited(ip)) return redirectToContact(request, "rate_limited");

    const formData = await request.formData();

    const honeypot = String(formData.get("website") || "").trim();
    if (honeypot) {
      return redirectToContact(request, "submitted");
    }

    const isCaptchaValid = await verifyCaptcha(request, formData, ip);
    if (!isCaptchaValid) return redirectToContact(request, "captcha_error");

    const parsed = contactSchema.safeParse({
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      companyName: String(formData.get("companyName") || ""),
      jobTitle: String(formData.get("jobTitle") || ""),
      workEmail: String(formData.get("workEmail") || ""),
      newsletter: String(formData.get("newsletter") || "") || undefined,
    });

    if (!parsed.success) return redirectToContact(request, "invalid");

    const payload = parsed.data;
    if (isLikelySpam(payload)) return redirectToContact(request, "invalid");

    const sent = await sendContactEmail(payload, request, ip);
    if (!sent) return redirectToContact(request, "delivery_not_configured");

    return redirectToContact(request, "submitted");
  } catch {
    return redirectToContact(request, "server_error");
  }
};

export const prerender = false;
