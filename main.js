'use strict'

function checkCode(HScode, restrictedArray, exceptionArray) {

  function checkIfCodeInArray(array, codeOnCheck = HScode) {
    let codeInArray = false;

    array.some((element) => {
      element = element.toString();
      let code = codeOnCheck.toString().substring(0, element.length); //обрезаем проверяемый код до длины сравниваемого, чтобы избежать ложных срабатываний
      if ( code.includes(element) ) codeInArray = true;
    });
    return codeInArray;
  }

  let codeIsRestricted = ( ! checkIfCodeInArray(restrictedArray) || checkIfCodeInArray(exceptionArray) ) ? false : true

  return codeIsRestricted;
}

function callCheck() {
  let codeOnCheck = document.querySelector('#HScode').value;
  let HTMLAnswer = document.querySelector('.answer');

  let checkResult311 = checkCode(codeOnCheck, CODES.restricted311, CODES.exception311);

  if ( codeOnCheck !== '' && codeOnCheck.length > 3 ) {
    if ( checkResult311 ) HTMLAnswer.innerHTML ='<p class="positive">Нужен СТ-1</p>'
    if ( ! checkResult311 ) HTMLAnswer.innerHTML ='<p class="negative">Можно отправлять</p>'
  } else HTMLAnswer.innerHTML = ''
}
