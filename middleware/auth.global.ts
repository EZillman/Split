export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useSupabaseUser();
    const publicRoutes = ['/login', '/register'];

    if (!user && !publicRoutes.includes(to.path)) {
        return;
    }

    if (user && to.path === '/') {
        return navigateTo('/home');
    }

})   


