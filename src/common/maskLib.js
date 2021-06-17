import util from './util';

const maskLib = {
  _applyMask: (mask, value) => {
    const masks = mask.split(';');
    const maskLen = masks.length; // 패턴의 개수
    let firstMaskLen = 0;
    let secondMaskLen = 0;
    let objMask;
    let _maskedValue = value;

    const splitter = mask.replace(/[0]/g, '')[0];
    if (splitter) {
      // 첫번째 패턴이 두번째 패턴보다 길이가 길면 두번째 패턴이 먼저 나와야 하므로 위치 교환하는 로직
      if(maskLen > 1) {
        if(masks[0].replace(/(\W)/g, '').length > masks[1].replace(/(\W)/g, '').length) {
          var tmp = masks[0];
          masks[0] = masks[1];
          masks[1] = tmp;
        }
      }

      firstMaskLen = masks[0].replace(/(\W)/g, '').trim().length; // 첫번째 패턴에서 특수기호를 제거한 실제 패턴의 길이
      objMask = maskLib._getExpFromMask(value, masks[0], splitter); // 첫번째 패턴을 토대로 정규식과 변환식을 리턴받음

      if(maskLen > 1) {
        // 일단 패턴이 최대 두개라는 가정하에. 추후3개이상인 경우 반복문 처리해야 할듯
        secondMaskLen = masks[1].replace(/(\W)/g, '').trim().length;

        // 두번째 패턴의 길이가 짧고 실제 값이 두번째 패턴 길이보다 크면 첫번째 패턴값을 적용
        // 첫번째 패턴의 길이가 짧고 실제 값이 첫번째 패턴 길이보다 크면 두번째 패턴값을 적용
        if(firstMaskLen > secondMaskLen && value.length > secondMaskLen || firstMaskLen === secondMaskLen) {
          objMask = maskLib._getExpFromMask(value, masks[0], splitter);
        } else if (firstMaskLen < secondMaskLen && value.length > firstMaskLen) {
          objMask = maskLib._getExpFromMask(value, masks[1], splitter);
        }
      }
      // 출력값에 실제값을 정규식 변환한 내용을 저장한다.
      const { regExp, repExp } = objMask;
      _maskedValue = _maskedValue.replace(regExp, repExp);
    }
    return _maskedValue;
  },
  _applyAsterik: (mask, maskValue) => {
    let applyValue = maskValue;
    const editLen = applyValue.length;
    for (let pos = 0; pos < editLen; pos += 1) {
      if (mask[pos] === '*') {
        applyValue = util.replaceAt(applyValue, pos, mask[pos]);
      }
    }
    return applyValue;
  },
  _getMaskLength: (mask) => {
    let pattLen = 0;
    const arrMasks = mask.split(';');
    if (arrMasks.length > 1) {
      for (let i = 0; i < arrMasks.length; i += 1) {
        const _mask = arrMasks[i];
        if(_mask) {
          const _pattLen = _mask.replace(/(\W)/g, '').trim().length; // 패턴에서 특수기호를 제거한 실제 패턴의 길이
          pattLen = pattLen < _pattLen ? _mask.length : pattLen;
        }
      }
    } else {
      pattLen = mask.length;
      // 패턴이 AAA-AAA같은 형식이 아니라 A(10)형식일 수 있음
      if (mask.indexOf('(') > -1) {
        pattLen = mask.replace(/[a-zA-Z()]/g, '');
      }
    }
    return parseInt(pattLen, 10);
  },
  _getExpFromMask: (_maskedValue, mask, splitter) => {
    const _maskPiece = mask.split(splitter);
    const _pattLen = _maskPiece.length;

    const strExp = [];
    const repExp = [];

    const arrCurrMask = [];
    const charPatt = maskLib.type === 'number' ? 'Z' : 'A';
    for (let i = 0; i < _pattLen; i += 1) {
      let _strReg;
      switch (charPatt) {
        case 'Z':
          if (i === 0) { // 첫번째 패턴 영역인 경우 무조건 전체 길이를 받아옴
            _strReg = `(\\d{${_maskPiece[i].length}})`;
            strExp.push(_strReg);
            repExp.push(`$${i + 1}`);
          } else { // 그 외엔 앞에 1, 패턴길이로 받아옴
            _strReg = `(\\d{1,${_maskPiece[i].length}})`;
            strExp.push(_strReg);
            repExp.push(`$${i + 1}`);
          }
          arrCurrMask.push(_maskPiece[i]);
          break;
        case 'A':
          if (i === 0) { // 첫번째 패턴 영역인 경우 무조건 전체 길이를 받아옴
            _strReg = `(\\w{${_maskPiece[i].length}})`;
            strExp.push(_strReg);
            repExp.push(`$${i + 1}`);
          } else { // 그 외엔 앞에 1, 패턴길이로 받아옴
            _strReg = `(\\w{1,${_maskPiece[i].length}})`;
            strExp.push(_strReg);
            repExp.push(`$${i + 1}`);
          }
          arrCurrMask.push(_maskPiece[i]);
          break;
        default:
          break;
      }
      // 실제 입력된 값이 현재 길이보다 짧다면 패턴을 만들면 안되므로 break;
      if (_maskedValue.length <= arrCurrMask.join('').length) {
        break;
      }
    }
    return { // 정규식과 $1-$2-$3같은 변환식을 만들어서 리턴
      // eslint-disable-next-line no-eval
      regExp: new RegExp(eval(`/${strExp.join('')}/g`)),
      repExp: repExp.join(splitter),
    };
  }
}
export default maskLib;