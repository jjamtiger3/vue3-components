import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return {
            checkBoxState: []
        }
    },
    mutations: {
        addStore(state, store) {
            state.checkBoxState.push(store)
        }
    },
    getters: {
        checkboxState: (state) => {
            return state.checkBoxState
        }
    }
})