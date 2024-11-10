<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ title }}</h1>
    <div class="space-x-4">
      <button
        @click="login"
        class="btn bg-blue-500 text-white hover:bg-transparent hover:text-black"
      >
        Log in with Github
      </button>
      <NuxtLink to="/" class="btn btn-outline no-underline"
        >Back to home
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
const { title } = useCourse();
const { query } = useRoute();
const supabase = useSupabaseClient();

const login = async () => {
  localStorage.setItem("redirectTo", (query.redirectTo as string) || "/");
  const redirectPath = `${window.location.origin}/auth/callback`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectPath,
    },
  });

  if (error) {
    console.error("Error logging in with Github", error);
  }
};
</script>
