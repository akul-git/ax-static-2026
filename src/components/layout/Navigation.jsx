import { useEffect, useState } from "react";
import ax from "../../assets/ax-logo.png";
import menu from "../../data/menu.json";

/**
 * @param {{
 *   initialPath?: string;
 * }} props
 */
export default function Navigation({ initialPath = "/" }) {
  const safeMenu = Array.isArray(menu) ? menu : [];
  const [openIndex, setOpenIndex] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hoveredSub, setHoveredSub] = useState(null);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === "undefined") return (initialPath || "/").replace(/\/$/, "") || "/";
    return window.location.pathname.replace(/\/$/, "") || "/";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePath = () => {
      const newPath = window.location.pathname.replace(/\/$/, "") || "/";
      setCurrentPath(newPath);
    };

    updatePath();
    window.addEventListener("popstate", updatePath);

    const interval = setInterval(() => {
      updatePath();
    }, 500);

    return () => {
      window.removeEventListener("popstate", updatePath);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const activeIndex = safeMenu.findIndex((item) => isActiveItem(item));
    if (activeIndex !== -1) {
      setOpenIndex(activeIndex);
    }
  }, [currentPath, safeMenu]);

  const normalizeHref = (href) => (href || "/").replace(/\/$/, "") || "/";

  const isActiveSub = (sub) => normalizeHref(sub.href) === currentPath;

  const isActiveItem = (item) => {
    const normalized = normalizeHref(item.href);
    if (normalized === currentPath) return true;
    if (item.children && item.children.length) {
      return item.children.some((sub) => isActiveSub(sub));
    }
    return false;
  };

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <nav className="hidden md:flex">
        <ul className="flex space-x-6 items-center">
          {safeMenu.map((item) => {
            const active = isActiveItem(item);
            return (
              <li key={item.href} className="relative group list-none">
                <a
                  href={item.href}
                  className={`px-4 py-2 rounded ${item.highlight ? "btn-primary" : ""} ${active ? "bg-sky-300 text-white font-semibold" : "text-gray-700 hover:text-sky-600"}`}
                >
                  {item.label}
                </a>

                {item.children && (
                  <ul
                    onMouseLeave={() => setHoveredSub(null)}
                    className="absolute left-0 mt-2 w-72 bg-white shadow-lg rounded-md origin-top transition-all duration-200 ease-out opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100"
                  >
                    {item.children.map((sub) => (
                      <li key={sub.href} className="list-none">
                        <a
                          href={sub.href}
                          onMouseEnter={() => setHoveredSub(sub.href)}
                          onMouseLeave={() => setHoveredSub(null)}
                          className={`block px-4 py-2 rounded ${isActiveSub(sub) ? "bg-sky-300 text-white" : hoveredSub === sub.href ? "bg-sky-100 text-sky-800" : "text-gray-600"}`}
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex justify-end items-center px-6 py-4 md:hidden">
        <button
          type="button"
          className="text-gray-700 focus:outline-none"
          onClick={() => setIsDrawerOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 left-0 w-3/4 max-w-sm h-screen bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-out md:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="sticky top-0 flex justify-between items-center px-6 py-5 bg-white border-b border-gray-100 shadow-sm">
          <img src={ax.src} alt="Asset Analytix Logo" className="max-h-10" />
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200 p-1"
            onClick={() => setIsDrawerOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="py-2">
          <ul className="flex flex-col">
            {safeMenu.map((item, index) => {
              const active = isActiveItem(item);
              const hasChildren = item.children && item.children.length > 0;
              return (
                <li key={item.href} className="list-none">
                  <button
                    type="button"
                    onClick={() => hasChildren && toggleIndex(index)}
                    className={`w-full flex justify-between items-center px-6 py-4 text-left font-medium transition-all duration-200 ${
                      active
                        ? "bg-linear-to-r from-sky-800 to-sky-700 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-base font-semibold">{item.label}</span>
                    {hasChildren && (
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 shrink-0 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {hasChildren && openIndex === index && (
                    <ul className="bg-gray-50 border-t border-gray-100 animate-in fade-in duration-200">
                      {item.children.map((sub) => (
                        <li key={sub.href} className="list-none">
                          <a
                            href={sub.href}
                            className={`block px-8 py-3 text-sm border-l-4 transition-all duration-200 ${
                              isActiveSub(sub)
                                ? "bg-sky-100 text-sky-800 border-sky-800 font-semibold"
                                : "text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-800"
                            }`}
                            onClick={() => setIsDrawerOpen(false)}
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
