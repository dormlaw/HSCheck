'use strict'

function checkCode(HScode) {

  function checkIfCodeInArray(array, codeOnCheck = HScode) {
    let codeInArray = false;

    array.some((element) => {
      element = element.toString();
      let code = codeOnCheck.toString().substring(0, element.length);
      if ( code.includes(element) ) codeInArray = true;
    });

    return codeInArray;
  }

  let codeIsRestricted = ( ! checkIfCodeInArray(restrictedCodes) || checkIfCodeInArray(exceptionCodes) ) ? false : true

  return codeIsRestricted;
}

function callCheck() {
  let codeOnCheck = document.querySelector('#HScode').value;
  let checkResult = checkCode(codeOnCheck);
  let HTMLAnswer = document.querySelector('.answer');
  if ( codeOnCheck !== '' ) {
    if ( checkResult ) HTMLAnswer.innerHTML ='<p class="positive">Нужен СТ-1</p>'
    if ( ! checkResult ) HTMLAnswer.innerHTML ='<p class="negative">Можно отправлять</p>'
  } else HTMLAnswer.innerHTML = ''
}
