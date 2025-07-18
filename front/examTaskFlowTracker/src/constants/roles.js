export const SUPERADMIN_EMAIL = 'root@taskflow.ua';

export const isSuperadmin = (user) =>
  user?.email === SUPERADMIN_EMAIL;
