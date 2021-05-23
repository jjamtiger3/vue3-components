import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return {
            checkBoxState: {
                chk_agree: {
                    checked: false,
                    text: ''
                },
                chk_privacy: {
                    checked: false,
                    text: ''
                }
            }
        }
    },
    mutations: {
        setChecked (state, payload) {
            const { target, checked } = payload
            state.checkBoxState[target].checked = checked;
        },
        setText (state, payload) {
            const { target, text } = payload
            state.checkBoxState[target].text = text;
        }
    },
    getters: {
        checkboxState: (state) => {
            return state.checkBoxState
        }
    }
})