import { useUserStore } from '~/stores/useUserStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie("access_token").value;
    
    if (!token) {
        return navigateTo('/login');
    }
    
    // Ensure user is initialized when accessing protected routes
    const userStore = useUserStore();
    if (!userStore.user && token) {
        await userStore.initUser();
    }
})