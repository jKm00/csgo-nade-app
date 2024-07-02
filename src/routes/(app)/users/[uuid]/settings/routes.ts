export type SettingsGroupRoute = {
  groupTitle: string;
  routes: SettingsRoute[];
};

type SettingsRoute = {
  label: string;
  link: string;
};

export const useSettingsRoutes = (userId: string | undefined) => {
  return [
    {
      groupTitle: 'General',
      routes: [
        {
          label: 'Profile settings',
          link: `/users/${userId}/settings`,
        },
        {
          label: 'Profile picture',
          link: `/users/${userId}/settings/picture`,
        },
        {
          label: 'Theme',
          link: `/users/${userId}/settings/theme`,
        },
      ],
    },
  ];
};
