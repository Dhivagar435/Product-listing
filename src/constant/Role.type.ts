export const ROLE = Object.freeze({
  USER: "STUDENT",ADMIN: "STAFF",
  SUPERADMIN: "PRINCIPAL",
  SUBADMIN: "SUBADMIN",
  DRIVER: "DRIVER",
});

export type RoleType = (typeof ROLE)[keyof typeof ROLE];
