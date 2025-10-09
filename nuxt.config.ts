import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      htmlAttrs: { "data-theme": "light" }, // default light mode
      link: [
        { rel: "preload", as: "style", href: "/_nuxt/assets/css/tailwind.css" },  // Preload Tailwind CSS
      ],
    },
  },
});
