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
      this.maskedReg = this.regFromMask();
      // this.maskedValue = this.maskedValue.replace(new RegExp(this.maskedReg.maskExp), this.maskedReg.regExp);
      const _maskedValue = maskLib._applyMask(this.mask, this.maskedValue); // 내부에 저장할 마스킹적용값
      this.innerMaskedValue = _maskedValue;
      this.maskedValue = maskLib._applyAsterik(this.mask, _maskedValue); // 화면에 출력할 값
      
  },
  methods: {
      /**
       * mask에 따라 입력된 값을 정규식처리하는 함수
       */
      regFromMask () {
          let arrMask = [];
          let _mask = this.mask;
          let specChar = '';
          const specExp = new RegExp(/[^\w*]/g);
          const wordExp = new RegExp(/[\w*]/g);
          // 입력된 문자열에 특수문자가 있는지 체크 하여 특수문자를 저장 (특수문자는 동일하다고 정의. 추후 특수문자가 여러개일경우는 수정필요)
          if(specExp.test(_mask)) {
              specChar = _mask.replace(wordExp, '')[0];
              arrMask = _mask.split(specChar);
          }
          const arrReg = [];
          const arrRep = [];
          let count = 0;
          // mask의 길이에 따라 정규식을 만드는 로직
          for(let i = 0; i < arrMask.length; i += 1) {
              const regChar = arrMask[i];
              const isNumber = !isNaN(regChar[0]) ? true : false;
              let strReg = isNumber ? `(\\d{${regChar.length}})` : `(\\w{${regChar.length}})`;
              count += regChar.length;
              // 입력이 마스크 길이만큼 되지않았다면 정규식을 중간까지만 만듬
              if (this.realValue.length >= count) {
                arrReg.push(strReg);
                arrRep.push(`$${(i + 1)}`)
              } else {
                  arrRep.push('');
                  break;
              }
          }
          return { maskExp: arrReg.join(''), regExp: arrRep.join(specChar) };
      },
      // masking (*)처리를 구현하기위해선 mask값의 * 포지션을 배열에 저장하여 입력값에서 변환하면 됨
      inputValue ($event) {
        const { target } = $event;
        let value = target.value;

        const wordExp = new RegExp(/[\w*]/g);
        const specChar = value.replace(wordExp, '')[0];

        // 입력된 값에서 실제 값만 추출하여 따로 저장
        const specExp = new RegExp(/[^\w*]/g);
        this.realValue = value.replace(specExp, '');

        const maskedReg = this.regFromMask();
        this.maskedValue = this.realValue.replace(new RegExp(maskedReg.maskExp), maskedReg.regExp);
        // 123-1234-에서 delete입력으로 - 제거시 비교 로직
        if (!$event.data) { // delete를 통해 데이터가 제거됬을경우
            const _value = this.maskedValue;
            const arrValue = _value.split('');
            // 특수문자앞에서 Del키로 삭제할경우 처리 구현해야함

            // 맨뒷글자가 특수문자 인경우 제거
            if (_value[_value.length - 1] === specChar) {
                arrValue.splice(arrValue.length - 1, 1);
                this.maskedValue = arrValue.join('');
            }
        }
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