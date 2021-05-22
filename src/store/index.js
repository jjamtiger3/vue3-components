import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return {
            checkboxState: {
                checked: false,
                text: ''
            }
        }
    }
})