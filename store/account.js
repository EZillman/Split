export const useAccountStore = defineStore({
    id: 'account',
    state: () => ({
        account: null,
        isLoggedIn: false,
    }),
    actions: {
        setaccount(account) {
            this.account = account;
            this.isLoggedIn = !!account;
        },
    },
});