export const icons = {
  phone: {
    family: 'BusinessPeople',
    value: '\ue902',
  },

  email: {
    family: 'BusinessPeople',
    value: '\ue903',
  },

  location: {
    family: 'BusinessOffice',
    value: '\ue904',
  },
} as const;

export type IconName = keyof typeof icons;