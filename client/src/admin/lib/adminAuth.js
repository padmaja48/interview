/** Admin role helpers — aligned with server role enum. */
export const normalizeAdminRole = (role) => {
  const r = String(role || '').trim();
  if (r === 'recruiter' || r === 'institutionAdmin') return 'admin';
  if (r === 'candidate') return 'student';
  return r;
};

export const isSuperAdmin = (user) => {
  const role = normalizeAdminRole(user?.role);
  return role === 'superAdmin';
};

/** College-scoped admin (may have multiple assigned institutions). */
export const isCollegeAdmin = (user) => {
  const role = normalizeAdminRole(user?.role);
  return role === 'admin';
};

/** @deprecated use isCollegeAdmin */
export const isInstitutionAdmin = isCollegeAdmin;

/** Either admin tier can access /admin/* */
export const isAdminUser = (user) => {
  if (!user) return false;
  if (isSuperAdmin(user) || isCollegeAdmin(user)) return true;
  if (!import.meta.env.DEV) return false;
  try {
    return localStorage.getItem('fluentai.forceAdmin') === 'true';
  } catch {
    return false;
  }
};

export const adminRoleLabel = (user) => {
  if (isSuperAdmin(user)) return 'Super Admin';
  if (isCollegeAdmin(user)) return 'Admin';
  return 'Admin';
};

export const getAssignedInstitutions = (user) => {
  if (!user) return [];
  if (Array.isArray(user.assignedInstitutions) && user.assignedInstitutions.length) {
    return user.assignedInstitutions;
  }
  if (user.institutionId || user.institution) {
    return [{
      id: String(user.institutionId || user.institution),
      name: user.institution || 'Assigned college',
    }];
  }
  return [];
};

/** Nav paths restricted to super admin only */
export const SUPER_ADMIN_ONLY_PATHS = [
  '/admin/institutions',
  '/admin/question-bank',
  '/admin/settings',
];

export const isSuperAdminOnlyPath = (pathname) =>
  SUPER_ADMIN_ONLY_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

export const ADMIN_COLORS = {
  cream: '#FAF7F0',
  creamAlt: '#F3EEE1',
  creamBorder: '#E7DFCC',
  tealAccent: '#0D9488',
  tealAccentHover: '#0F766E',
  tealAccentLight: '#CCFBF1',
  ink: '#1F2A27',
  inkMuted: '#6B7280',
  warn: '#D97706',
  danger: '#DC2626',
  surface: '#FFFFFF',
  darkBg: '#0E1F1C',
  darkSurface: '#14302B',
  darkAccent: '#5EEAD4',
  darkText: '#ECFDF5',
};
