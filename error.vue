<template>
  <NuxtLayout>
    <section class="flex flex-col">
      <div v-if="error?.statusCode === 404" class="prose">
        <h1>404</h1>
        <p>This page doesn't exist</p>
      </div>
      <div v-else class="prose">
        <h1>Dang</h1>
        <p>Look like something is wrong.</p>
      </div>
      <div class="prose">
        <p>
          <strong>{{ error?.message }}</strong>
        </p>
        <p>
          Go to the
          <span @click="handleError" class="link link-hover">first lesson</span>
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error = useError();
const handleError = () => {
  clearError({
    redirect:
      "/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3",
  });
};
</script>

<style scoped></style>
