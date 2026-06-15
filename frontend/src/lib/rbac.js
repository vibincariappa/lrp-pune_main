export const PERMISSIONS = {
  UPLOAD_FILES: "UPLOAD_FILES",
  UPDATE_METRICS: "UPDATE_METRICS",
  VIEW_AUDIT_LOGS: "VIEW_AUDIT_LOGS",
  MANAGE_USERS: "MANAGE_USERS",
  VIEW_DASHBOARD: "VIEW_DASHBOARD"
};

export const ROLE_PERMISSIONS = {
  SUPER_ADMIN1: [
    PERMISSIONS.UPLOAD_FILES,
    PERMISSIONS.UPDATE_METRICS,
    PERMISSIONS.VIEW_AUDIT_LOGS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_DASHBOARD
  ],
  SUPER_ADMIN2: [
    PERMISSIONS.UPLOAD_FILES,
    PERMISSIONS.UPDATE_METRICS,
    PERMISSIONS.VIEW_AUDIT_LOGS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_DASHBOARD
  ],
  ADMIN1: [
    PERMISSIONS.UPLOAD_FILES,
    PERMISSIONS.UPDATE_METRICS,
    PERMISSIONS.VIEW_DASHBOARD
  ],
  ADMIN2: [
    PERMISSIONS.VIEW_DASHBOARD
  ],
  DEVELOPER: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_AUDIT_LOGS
  ]
};

/**
 * Checks if a given role has a specific permission.
 * Supports dynamic role checking by checking if the role exists in the mapping.
 * @param {string} role
 * @param {string} permission
 * @returns {boolean}
 */
export const hasPermission = (role, permission) => {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) {
    // Dynamic role expansion: unrecognized/new db roles default to viewing dashboard
    return permission === PERMISSIONS.VIEW_DASHBOARD;
  }
  return permissions.includes(permission);
};

/**
 * Determines if a role is authorized to access a set of roles or permissions.
 * @param {string} role
 * @param {string|string[]} allowedRolesOrPermissions
 * @returns {boolean}
 */
export const isAuthorized = (role, allowedRolesOrPermissions) => {
  if (!role) return false;
  if (!allowedRolesOrPermissions) return true;

  const requirements = Array.isArray(allowedRolesOrPermissions)
    ? allowedRolesOrPermissions
    : [allowedRolesOrPermissions];

  return requirements.some(item => {
    // If it's a known role string
    if (ROLE_PERMISSIONS[item] !== undefined) {
      return role === item;
    }
    // Otherwise check permission
    return hasPermission(role, item);
  });
};
