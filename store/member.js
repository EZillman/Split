import { defineStore } from 'pinia'

export const useMemberStore = defineStore({
    id: 'member',
    state: () => ({
        memberId: null,
    }),
    actions: {
        setMemberId(id) {
            this.memberId = id;
            localStorage.setItem('memberId', id);
        },
        getMemberIdFromLocalStorage() {
            const memberId = localStorage.getItem('memberId');
            if (memberId) {
                this.memberId = memberId;
            }
        },
    },
    persist: true,
});
