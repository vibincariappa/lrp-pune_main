const PERMISSIONS = {
  UPLOAD_FILES: "UPLOAD_FILES",
  UPDATE_METRICS: "UPDATE_METRICS",
  VIEW_AUDIT_LOGS: "VIEW_AUDIT_LOGS",
  MANAGE_USERS: "MANAGE_USERS",
  VIEW_DASHBOARD: "VIEW_DASHBOARD"
};

const ROLE_PERMISSIONS = {
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
 * Checks if a role has the specified permission.
 * Supports dynamic role checking by checking if the role exists in the mapping.
 * @param {string} role 
 * @param {string} permission 
 * @returns {boolean}
 */
const hasPermission = (role, permission) => {
  if (!role) return false;
  
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) {
    // Dynamic role expansion: unrecognized/new db roles default to view dashboard
    return permission === PERMISSIONS.VIEW_DASHBOARD;
  }
  
  return permissions.includes(permission);
};

module.exports = {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission
};
