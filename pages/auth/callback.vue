<!-- /pages/auth/callback.vue -->
<template>
  <div>Loading...</div>
</template>

<script setup lang="ts">
const router = useRouter();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

onMounted(async () => {
  await supabase.auth.getSession();
  if (user.value) {
    const redirectTo = localStorage.getItem("redirectTo") || "/";
    localStorage.removeItem("redirectTo");
    router.replace(redirectTo);
  }
});
</script>
