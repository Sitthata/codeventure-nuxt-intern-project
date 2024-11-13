import { useSupabaseUser } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  const { data: hasAccess } = await useFetch("/api/user/hasAccess", {
    headers: useRequestHeaders(["cookie"]),
  });

  if (to.params.chapterSlug === "1-chapter-1") {
    return;
  }

  if (user.value && hasAccess.value) {
    return;
  }

  if (user.value) {
    return
  }

  // if (user.value && !hasAccess.value) {
  //   const client = useSupabaseClient();
  //   await client.auth.signOut();
  //   return navigateTo("/login");
  // }

  // Redirect unauthenticated users to the login page
  return navigateTo(`/login`);
});
