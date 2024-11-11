<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ course.title }}</h1>
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
const course = await useCourse();
const { query } = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo(query.redirectTo as string, {
      replace: true,
    });
  }
});

const login = async () => {
  const queryParams =
    query.redirectTo !== undefined ? `?redirectTo=${query.redirectTo}` : "";
  const redirectTo = `${window.location.origin}/confirm${queryParams}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });

  if (error) {
    console.error(error);
  }
};
</script>
