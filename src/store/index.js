import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return {
            checkBoxState: {}
        }
    },
    mutations: {
        setChecked (state, payload) {
            const { target, checked } = payload
            if (!state.checkBoxState[target]) {
                state.checkBoxState[target] = {}
            }
            state.checkBoxState[target].checked = checked;
        },
        setText (state, payload) {
            const { target, text } = payload
            if (!state.checkBoxState[target]) {
                state.checkBoxState[target] = {}
            }
            state.checkBoxState[target].text = text;
        }
    },
    getters: {
        checkboxState: (state) => {
            return state.checkBoxState
        }
    }
})