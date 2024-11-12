// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    stripeSecret: "",
    public: {
      stripeKey: "",
    },
    stripeWebhookSecret: "",
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/*"], // We implement our own auth behaviour in the auth middleware
    },
  },
  nitro: {
    prerender: {
      routes: ["/landing"],
    },
  },
});
