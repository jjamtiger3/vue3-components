<template>
  <div>
    <VueButton text="Button1" v-on:click="onClick"></VueButton>
    <VueButton text="Button2" icon-class="fa-star"></VueButton>
    <VueButton text="Button3" icon-class="fa-plus"></VueButton>
    <vue-check-box :checked="checkboxList[0].checked"
     :text="checkboxList[0].text"
     uid="ckb_agree_terms"
     uindex="0"
     v-on:onCheckedValueChanged="valueChange"
     v-on:onAfterMounted="addStore"
     ></vue-check-box>
    <vue-check-box :checked="checkboxList[1].checked"
     :text="checkboxList[1].text"
    direction="right"
    uid="ckb_agree_privacy"
     uindex="1"
     v-on:onAfterMounted="addStore"
    ></vue-check-box>
  </div>
</template>

<script>
import VueButton from './components/VueButton.vue'
import VueCheckBox from './components/VueCheckBox.vue'
import { mapGetters } from 'vuex'
import checkboxStore from './store/components/checkbox'

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
    this.checkboxState[0].commit('setChecked', true)
    this.checkboxState[0].commit('setText', '진짜로 동의합니다')
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
      console.log(`${evt.oldValue} ==> oldValue, ${evt.newValue} ==> newValue`)
    },
    addStore() {
      this.$store.commit('addStore', checkboxStore)
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
