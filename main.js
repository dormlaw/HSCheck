'use strict'

const btnCheck = document.querySelector('.button');
const btnDel = document.querySelector('.delete');
btnCheck.addEventListener('click', () => callCheck('check'));
btnDel.addEventListener('click', () => callCheck('clear'));

function checkCode(HScode, restrictedArray, exceptionArray) {

  function checkIfCodeInArray(array, codeOnCheck = HScode) {
    let codeInArray = false;

    array.some((element) => {
      element = element.toString();
      let code = codeOnCheck.toString().substring(0, element.length); //обрезаем проверяемый код до длины сравниваемого, чтобы избежать ложных срабатываний
      if (code.includes(element)) codeInArray = true;
    });
    return codeInArray;
  }

  let codeIsRestricted = (!checkIfCodeInArray(restrictedArray) || checkIfCodeInArray(exceptionArray)) ? false : true

  return codeIsRestricted;
}

function callCheck(type) {
  const inputField = document.querySelector('.input');
  const HTMLAnswer = document.querySelector('.answer');
  const codeOnCheck = inputField.value;

  switch (type) {
    case 'clear':
      inputField.value = ''
      HTMLAnswer.innerHTML = ''
      break
    case 'check':
      if (codeOnCheck !== '' && codeOnCheck.length > 3) {
        let checkResult311 = checkCode(codeOnCheck, CODES.restricted311, CODES.exception311);
        let checkResultTax = checkCode(codeOnCheck, CODES.tax30, []);
        
        let loader = '';
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            loader += '.';
            HTMLAnswer.innerHTML = `<p class="positive">${loader}</p>`;
            if (i === 3) {
              if (checkResult311) HTMLAnswer.innerHTML = '<p class="positive">Нужен СТ-1</p>';
              if (!checkResult311) HTMLAnswer.innerHTML = '<p class="negative">Можно отправлять</p>';
              if (checkResultTax) HTMLAnswer.insertAdjacentHTML("beforeend", '<p class="positive">сбор 30тыс.р.</p>');
            }
          }, i * 250);
        }
      } else {
        HTMLAnswer.innerHTML = '<p class="positive">короткий код</p>';
      }
      break
  }
}
