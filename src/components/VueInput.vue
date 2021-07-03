<template>
<div>
  <div class="root-input">
      <input ref="display" :maxlength="maxLength" v-on:input="inputValue($event)">
      <input ref="hidden" type="hidden" v-model="maskedValue">
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
      maxLength: 0
    }
  },
  props: {
      value: String,
      mask: String
  },
  mounted() {
      this.maxLength = this.mask.length;
      this.realValue = this.value;
      // this.maskedValue = this.maskedValue.replace(new RegExp(this.maskedReg.maskExp), this.maskedReg.regExp);
      const _maskedValue = maskLib._applyMask(this.mask, this.realValue); // 내부에 저장할 마스킹적용값
      this.maskedValue = _maskedValue;
      this.$refs.display.value = maskLib._applyAsterik(this.mask, this.maskedValue);
      
  },
  methods: {
      inputValue ($event) {
        const realValue = maskLib._applyReal($event.target.value, this.maskedValue);
        const _maskedValue = maskLib._applyMask(this.mask, realValue); // 내부에 저장할 마스킹적용값
        this.maskedValue = _maskedValue;
        this.realValue = realValue;
        this.$refs.display.value = maskLib._applyAsterik(this.mask, this.maskedValue);
      },
      getRealValue() {
          return this.realValue;
      },
      getMaskedValue() {
          return maskLib._applyAsterik(this.mask, this.maskedValue);
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
        cursor: pointer;
    }
    div.root-input:hover svg {
        display: inline-block;
    }
    div.root-input input:focus + svg {
        display: inline-block;
    }
</style>