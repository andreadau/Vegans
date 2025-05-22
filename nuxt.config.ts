// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@/assets/scss/main.scss'],

  runtimeConfig: {
    // Variables defined here are only available on the server side by default
    mongodbUri: process.env.MONGODB_URI, // This makes MONGODB_URI from .env available as config.mongodbUri

    // If you had public variables (accessible on client & server), you'd put them here:
    // public: {
    //   siteName: 'My Awesome Site',
    // }
  },
})