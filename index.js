'use strict';
// let promptedCode = prompt('Введите код ТН ВЭД, который хотитие проверить', '');
// let promptedCode = new URLSearchParams(window.location.search)
const button = document.querySelector('#checkButton');
button.onclick = callCheck();

function checkCode(HScode) {
  let codeIsRestricted = false;
  const restrictedCodes = [300610, 3006400000, 3006700000, 840732];

  const exceptionCodes = [8207309000, 8407310000];

  function checkIfCodeInArray(array, code = HScode) {
    let codeInArray = false;
    array.some((element) => {
      element = element.toString();
      code = code.toString().substring(0, element.length);
      if (code.includes(element)) codeInArray = true;
      return codeInArray;
    });
    return codeInArray;
  }

  if (checkIfCodeInArray(restrictedCodes)) codeIsRestricted = true;

  if (codeIsRestricted) {
    if (checkIfCodeInArray(exceptionCodes)) codeIsRestricted = false;
  }

  return codeIsRestricted;
}

function callCheck() {
  let codeOnCheck = document.querySelector('#HScode').value;
  let checkResult = checkCode(codeOnCheck);
  let HTMLAnswer = document.querySelector('.answer');
  // return console.log(checkResult, codeOnCheck);
  if (checkResult) HTMLAnswer.innerHTML ='<p class="positive">Нужен СТ-1</p>'
  if (!checkResult) HTMLAnswer.innerHTML ='<p class="negative">Можно отправлять</p>'
}
