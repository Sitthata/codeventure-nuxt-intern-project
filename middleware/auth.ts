import { useSupabaseUser } from '#imports';

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user.value) {
    // User is authenticated, allow navigation
    return;
  }

  if (to.path.startsWith('/auth/callback')) {
    // Allow access to the auth callback route
    return; 
  }

  if (to.params.chapterSlug === "1-chapter-1") {
    // Allow access to this specific chapter
    return;
  }

  // Redirect unauthenticated users to the login page
  return navigateTo(`/login?redirectTo=${to.fullPath}`);
});
