// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  app: {
    head: {  
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Split',

    }
  }
})
