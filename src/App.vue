<template>
  <div>
    <VueButton text="Button1" v-on:click="onClick"></VueButton>
    <VueButton text="Button2" icon-class="fa-star"></VueButton>
    <VueButton text="Button3" icon-class="fa-plus"></VueButton>
    <vue-check-box :checked="checkedList[0]"
     text="약관에 동의합니다"
     v-on:onCheckedValueChanged="log"
     ></vue-check-box>
    <vue-check-box :checked="checkedList[1]" text="개인정보 이용 동의" direction="right"></vue-check-box>
  </div>
</template>

<script>
import VueButton from './components/VueButton.vue'
import VueCheckBox from './components/VueCheckBox.vue'

export default {
  name: 'App',
  components: {
    VueButton,
    VueCheckBox
  },
  data() {
    return {
      checkedList: [true, false]
    }
  },
  methods: {
    onClick: function() {
      console.log(this.$store.state.checkboxState)
      this.$store.state.checkboxState.chekced = !this.$store.state.checkboxState.chekced
    },
    log: function (evt) {
      const { oldValue, newValue } = evt
      console.log(`oldValue ===> ${oldValue}, newValue ===> ${newValue}`)
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
