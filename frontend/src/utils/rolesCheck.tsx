export const rolesCheck = (userRoles: Array<string>, requiredRoles: Array<string>) => {
  let hasPermission = false;

  for (const i in userRoles) {
    if (requiredRoles.includes(userRoles[i])) {
      hasPermission = true;
    }
  }

  return hasPermission;
};