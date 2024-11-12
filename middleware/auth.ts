import { useSupabaseUser } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  const { data: hasAccess } = await useFetch("/api/user/hasAccess", {
    headers: useRequestHeaders(["cookie"]),
  });

  if (user.value) {
    // User is authenticated, allow navigation
    return;
  }

  if (hasAccess.value || to.params.chapterSlug === "1-chapter-1") {
    // Allow access to this specific chapter
    return;
  } else if (user.value && !hasAccess.value) {
    const client = useSupabaseClient();
    await client.auth.signOut();
  }

  // Redirect unauthenticated users to the login page
  return navigateTo(`/login?redirectTo=${to.fullPath}`);
});
