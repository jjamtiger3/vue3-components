<template>
<div>
  <div class="root-input">
      <input v-model="dataValue" :maxlength="maxLength" v-on:input="inputValue($event)">
      <svg class="fas fa-times"></svg>
  </div>
</div>
</template>

<script>
export default {
  name: 'VueInput',
  data() {
    return {
      dataValue: '',
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
      this.dataValue = this.value;
      this.realValue = this.value;
      this.maskedReg = this.regFromMask();
      this.dataValue = this.dataValue.replace(new RegExp(this.maskedReg.maskExp), this.maskedReg.regExp);
  },
  methods: {
      regFromMask () {
          // 1. 전체 문자열에서 문자 / 숫자 / * 를 제외한 특수문자가 있는지 체크
          // 2. 있으면 특수문자로 split하여 첫번째 요소로 정규식 작성후 배열에 담고 특수문자도 배열에 담음
          // 3. 2를 토대로 정규식 문자열 작성
          // 4. 마스킹 길이에 따라 maxlength 지정
          // 5. 숫자 / 문자 혼용은 은 추후 구현
          // 6. 카드번호나 주민번호처럼 중간에 *는 추후 구현
          // 7. 0으로 시작하면 타입은 넘버, l로 시작하면 문자
          let arrMask = [];
          let _mask = this.mask;
          let specChar = '';
          const specExp = new RegExp(/[^\w*]/g);
          const wordExp = new RegExp(/[\w*]/g);
          if(specExp.test(_mask)) {
              specChar = _mask.replace(wordExp, '')[0];
              arrMask = _mask.split(specChar);
          }
          const arrReg = [];
          const arrRep = [];
          let count = 0;
          for(let i = 0; i < arrMask.length; i += 1) {
              const regChar = arrMask[i];
              const isNumber = !isNaN(regChar[0]) ? true : false;
              let strReg = isNumber ? `(\\d{${regChar.length}})` : `(\\w{${regChar.length}})`;
              count += regChar.length;
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
      inputValue ($event) {
        let value = $event.target.value;
        const wordExp = new RegExp(/[\w*]/g);
        const specChar = value.replace(wordExp, '')[0];
        const specExp = new RegExp(/[^\w*]/g);
        this.realValue = value.replace(specExp, '');
        const maskedReg = this.regFromMask();
        this.dataValue = this.realValue.replace(new RegExp(maskedReg.maskExp), maskedReg.regExp);
        // 123-1234-에서 delete입력으로 - 제거시 비교 로직
        if (!$event.data) {
            const _value = this.dataValue;
            if (_value[_value.length - 1] === specChar) {
                const arrValue = _value.split('');
                arrValue.splice(arrValue.length - 1, 1);
                this.dataValue = arrValue.join('');
            }
        }
      }
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