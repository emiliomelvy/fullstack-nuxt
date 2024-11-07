// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  srcDir: "src/",
  typescript: {
    // typeCheck: true,
    strict: true,
  },
  image: {
    format: ["webp"],
  },
  modules: ["@nuxt/ui", "@nuxt/image"],
});
