import { useUserStore } from '~/stores/useUserStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("access_token").value;
  
  // If user is already logged in, redirect to home
  if (token) {
    const userStore = useUserStore();
    
    // Make sure user data is loaded
    if (!userStore.user) {
      await userStore.initUser();
    }
    
    // If still have valid token after init, go to home
    if (userStore.isLoggedIn) {
      return navigateTo('/home');
    }
  }
})
