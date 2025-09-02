// Admin Configuration
// Add or remove admin emails here to control admin panel access

/**
 * List of email addresses that have admin privileges
 * To add a new admin:
 * 1. Add their email to this array
 * 2. They can then access /admin routes after logging in
 */
export const ADMIN_EMAILS = [
  'admin@ziyo.com',
  'ravindunilash@gmail.com',
  // Add more admin emails here:
  // 'newadmin@ziyo.com',
  // 'manager@ziyo.com',
];

/**
 * Check if a user has admin privileges
 * @param user - User object with email property
 * @returns boolean - true if user is admin
 */
export const isAdmin = (user: { email?: string | null } | null): boolean => {
  return user?.email ? ADMIN_EMAILS.includes(user.email) : false;
};

/**
 * Add a new admin email (for programmatic admin management)
 * @param email - Email address to grant admin access
 */
export const addAdminEmail = (email: string): void => {
  if (!ADMIN_EMAILS.includes(email)) {
    ADMIN_EMAILS.push(email);
    console.log(`Added admin access for: ${email}`);
  }
};

/**
 * Remove admin email (for programmatic admin management)
 * @param email - Email address to revoke admin access
 */
export const removeAdminEmail = (email: string): void => {
  const index = ADMIN_EMAILS.indexOf(email);
  if (index > -1) {
    ADMIN_EMAILS.splice(index, 1);
    console.log(`Removed admin access for: ${email}`);
  }
};

/**
 * Get all current admin emails
 * @returns Array of admin email addresses
 */
export const getAdminEmails = (): string[] => {
  return [...ADMIN_EMAILS];
};
