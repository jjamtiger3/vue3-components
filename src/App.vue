<template>
  <div>
    <VueButton text="Button1" v-on:click="onClick"></VueButton>
    <VueButton text="Button2" icon-class="fa-star"></VueButton>
    <VueButton text="Button3" icon-class="fa-plus"></VueButton>
    <vue-check-box 
      :checked="this.getCheckBoxState('chk_agree').checked"
      :text="this.getCheckBoxState('chk_agree').text"
      uid="chk_agree"
      v-on:onCheckedValueChanged="valueChange"
     ></vue-check-box>
    <vue-check-box 
      :checked="this.getCheckBoxState('chk_privacy').checked"
      :text="this.getCheckBoxState('chk_privacy').text"
      uid="chk_privacy"
      direction="right"
      v-on:onCheckedValueChanged="valueChange"
    ></vue-check-box>
  </div>
</template>

<script>
import VueButton from './components/VueButton.vue'
import VueCheckBox from './components/VueCheckBox.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    VueButton,
    VueCheckBox
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('setChecked', {
      target: 'chk_agree',
      checked: true
    })
    this.$store.commit('setText', {
      target: 'chk_agree',
      text: '진짜로 동의합니다. '
    })
    this.$store.commit('setText', {
      target: 'chk_privacy',
      text: '개인정보 이용약관에 동의합니다.'
    })
  },
  computed: {
    ...mapGetters([
      'checkboxState'
    ])
  },
  getters: {
    checkboxState: () => {
      return this.$store.getters.checkboxState
    },
  },
  methods: {
    valueChange(evt) {
      const { newValue, target } = evt
      console.log(`${evt.oldValue} ==> oldValue, ${evt.newValue} ==> newValue`)
      this.$store.commit('setChecked', {
        target,
        checked: newValue
      })
      console.log(this.checkboxState[evt.target].checked)
    },
    getCheckBoxState(target) {
      return this.checkboxState[target] || {}
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
