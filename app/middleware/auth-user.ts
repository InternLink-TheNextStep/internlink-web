
export default defineNuxtRouteMiddleware((to,from)=>{
    const token = useCookie("access_token").value;
    if(!token){
        return navigateTo('/login');
    }
})