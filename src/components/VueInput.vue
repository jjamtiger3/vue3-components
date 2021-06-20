<template>
<div>
  <div class="root-input">
      <input v-model="maskedValue" :maxlength="maxLength" v-on:input="inputValue($event)">
      <svg class="fas fa-times"></svg>
  </div>
</div>
</template>

<script>
import maskLib from '../common/maskLib.js';

export default {
  name: 'VueInput',
  data() {
    return {
      maskedValue: '',
      realValue: '',
      classList: [],
      maxLength: 0,
      innerMaskedValue: ''
    }
  },
  props: {
      value: String,
      mask: String
  },
  mounted() {
      this.maxLength = this.mask.length;
      this.maskedValue = this.value;
      this.realValue = this.value;
      // this.maskedValue = this.maskedValue.replace(new RegExp(this.maskedReg.maskExp), this.maskedReg.regExp);
      const _maskedValue = maskLib._applyMask(this.mask, this.maskedValue); // 내부에 저장할 마스킹적용값
      this.innerMaskedValue = _maskedValue;
      this.maskedValue = maskLib._applyAsterik(this.mask, _maskedValue); // 화면에 출력할 값
      
  },
  methods: {
      inputValue ($event) {
          console.log($event);
      },
      getRealValue() {
          return this.realValue;
      },
      getMaskedValue() {
          return this.maskedValue;
      },
  }
}
</script>
<style scoped>
    div.root-input {
        display: inline-flex;
        align-items: center;
    }
    div.root-input input {
        padding-right: 20px;
    }
    div.root-input svg {
        position: relative;
        display: none;
        right: 20px;
    }
    div.root-input:hover svg {
        display: inline-block;
    }
    div.root-input input:focus + svg {
        display: inline-block;
    }
</style>