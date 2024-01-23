import { defineStore } from 'pinia'

export const useMemberStore = defineStore({
    id: 'member',
    state: () => ({
        memberId: null,
    }),
    actions: {
        setMemberId(id) {
            this.memberId = id;
        },
    },
    persist: true,
});