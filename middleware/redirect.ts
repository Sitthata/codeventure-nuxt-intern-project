export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  console.log(user.value);
  if (to.path === "/" && !user.value) {
    return navigateTo("/landing");
  }
});
