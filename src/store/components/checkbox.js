import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            checked: false,
            text: ''
        }
    },
    mutations: {
        setChecked (state, checked) {
            state.checked = checked;
        },
        setText (state, text) {
            state.text = text
        }
    }
})