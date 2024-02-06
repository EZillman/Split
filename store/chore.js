import { defineStore } from 'pinia'

export const useChoreStore = defineStore({
    id: 'chore',
    state: () => ({
        choreId: null,
    }),
    actions: {
        setChoreId(id) {
            this.choreId = id;
        },
        getChoreIdFromLocalStorage() {
            const choreId = localStorage.getItem('choreId');
            if (choreId) {
                this.choreId = choreId;
            }
        },
    },
});