import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null,
        isLoggedIn: false,
    }),
    actions: {
        setUser(user) {
            this.user = user;
            this.isLoggedIn = !!user;
        },
    },
});