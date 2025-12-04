import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@pinia/nuxt"],
  css: ["@/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: { "data-theme": "light" },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      doSpacesUrl: process.env.NUXT_PUBLIC_DO_SPACES_URL,
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  },
  //  This ensures Nuxt includes your custom .d.ts files (like daisyui.d.ts)
  hooks: {
    "prepare:types": (opts) => {
      opts.tsConfig.include?.push("./types/**/*.d.ts");
    },
  },
});
