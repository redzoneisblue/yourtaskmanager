// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/login",
      callback: "/login"
    },
    cookieName: "sb-auth-token",
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: false
    }
  },
  fonts: {
    families: [
      { name: 'Roboto', provider: 'google' }
  ]
  }
})