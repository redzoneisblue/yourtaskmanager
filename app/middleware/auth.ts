export default defineNuxtRouteMiddleware(async (to, _from) => {
    const client = useSupabaseClient()
    const session = useSupabaseSession()
    
    // Ensure we have the latest session state
    await client.auth.getSession()
    
    if (!session.value) {
      return navigateTo('/login')
    }
  })
