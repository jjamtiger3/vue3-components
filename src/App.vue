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
    <vue-input ref="input0" value="01050113021" mask="000-0000-0000"></vue-input>
    <vue-input ref="input1" value="8309261111111" mask="000000-0000000"></vue-input>
    <vue-input ref="input2" value="8309261111111" mask="000000-0******"></vue-input>
    <vue-input ref="input3" value="1111222233334444" mask="0000-0000-0000-0000"></vue-input>
    <vue-input ref="input4" value="1111222233334444" mask="0000-****-****-0000"></vue-input>
    <textarea class="print-zone" ref="textarea0"></textarea>
  </div>
</template>

<script>
import VueButton from './components/VueButton.vue'
import VueCheckBox from './components/VueCheckBox.vue'
import VueInput from './components/VueInput.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    VueButton,
    VueCheckBox,
    VueInput
  },
  data() {
    return {
      gridData: {
        styles: {
          'margin-top': '20px',
          width: '250px',
          height: '200px',
          border: '1px solid #000000'
        },
        columns: [
          {
            id: 'column1',
            header: {
              text: '날짜',
              style: {
                'background-color': '#eeeeee',
                'text-align': 'center',
                'font-size': '14px'
              }
            },
            style: {
              width: '100px'
            }
          },
          {
            id: 'column2',
            header: {
              text: '수량',
              style: {
                'background-color': '#eeeeee',
                'text-align': 'center',
                'font-size': '14px'
              }
            },
            style: {
              width: '50px'
            }
          },
          {
            id: 'column3',
            header: {
              text: '기타',
              style: {
                'background-color': '#eeeeee',
                'text-align': 'center',
                'font-size': '14px'
              }
            },
            style: {
              width: '300px'
            }
          },
        ]
      }
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
    },
    onClick() {
      const arrValue = [];
      arrValue.push(`input0 maskedValue: ${this.$refs.input0.getMaskedValue()}`);
      arrValue.push(`input1 maskedValue: ${this.$refs.input1.getMaskedValue()}`);
      arrValue.push(`input2 maskedValue: ${this.$refs.input2.getMaskedValue()}`);
      arrValue.push(`input3 maskedValue: ${this.$refs.input3.getMaskedValue()}`);
      arrValue.push(`input4 maskedValue: ${this.$refs.input4.getMaskedValue()}`);
      arrValue.push(`input0 realValue: ${this.$refs.input0.getRealValue()}`);
      arrValue.push(`input1 realValue: ${this.$refs.input1.getRealValue()}`);
      arrValue.push(`input2 realValue: ${this.$refs.input2.getRealValue()}`);
      arrValue.push(`input3 realValue: ${this.$refs.input3.getRealValue()}`);
      arrValue.push(`input4 realValue: ${this.$refs.input4.getRealValue()}`);
      this.$refs.textarea0.value = arrValue.join('\n');
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
textarea.print-zone {
  width: 350px;
  height: 300px;
  margin-top: 30px;
}
</style>
