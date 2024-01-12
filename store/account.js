import { defineStore } from 'pinia'

export const useAccountStore = defineStore({
    id: 'account',
    state: () => ({
        account: null,
        isLoggedIn: false,
    }),
    actions: {
        setAccount(account) {
            this.account = account;
            this.isLoggedIn = !!account;
        },
    },
});