export const dynamicRoutes = [
  '/dashboard',
  '/create-memorial',
  '/gallery',
  '/sign-in',
  '/sign-up',
  '/sign-out',
  '/contact',
  '/auth/callback',
  '/sso-callback',
  '/api/protected-route',
  '/api/supabase-token',
  '/api/test-auth'
];

export const staticRoutes = [
  '/',
  '/privacy',
  '/terms'
];

export const isDynamicRoute = (path: string) => {
  return dynamicRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
};

export const isStaticRoute = (path: string) => {
  return staticRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
};
