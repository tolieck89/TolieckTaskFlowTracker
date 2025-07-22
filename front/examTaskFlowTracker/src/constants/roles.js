export const SUPERADMIN_EMAIL = 'tolieck89@gmail.com';

export const isSuperadmin = (user) =>
  user?.email === SUPERADMIN_EMAIL;
