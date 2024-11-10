<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ title }}</h1>
    <button
      @click="login"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Log in with Github
    </button>
  </div>
</template>
<script setup lang="ts">
const { title } = useCourse();
const { query } = useRoute();
const user = useSupabaseUser();

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
