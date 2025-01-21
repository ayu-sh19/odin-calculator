const numbersLineOne = document.querySelector(".numbersLineOne");
var numbers = [].slice.call(numbersLineOne.children);

const numbersLineTwo = document.querySelector(".numbersLineTwo");
numbers = numbers.concat([].slice.call(numbersLineTwo.children));

const numbersLineThree = document.querySelector(".numbersLineThree");
numbers = numbers.concat([].slice.call(numbersLineThree.children));

const lastRow = document.querySelector(".lastRow");
const periodElement = document.querySelector(".period");

numbers = numbers.concat([].slice.call(lastRow.children));

const display = document.querySelector(".display");


let firstNumber = "";
let secondNumber = "";
let operator;

let count = 0;
let output = 0;
let flag = 0;

let periodFlag = false;

let obj = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  period: ".",
};

numbers.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.className == "period") {
      element.disabled = true;
    }

    if (flag == 1) {
      display.textContent = obj[element.className];
      flag = 0;
    } else {
      display.textContent += obj[element.className];
    }
  });
});

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  display.textContent = "";
  firstNumber = 0;
  secondNumber = 0;
  count = 0;
});

const signBtn = document.querySelector(".sign");
signBtn.addEventListener("click", () => {
  display.textContent = -1 * display.textContent;
});


const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0,-1);
})


const operatorDiv = document.querySelector(".operator");
var operators = [].slice.call(operatorDiv.children);

operators.forEach((element) => {
  element.addEventListener("click", () => {
    if (count == 0) {
      firstNumber = parseFloat(display.textContent);
      count = 1;
      operator = element.className;
    } else if (count == 1) {
      if (operator != "equal") {
        secondNumber = parseFloat(display.textContent);
        output = parseFloat(operate(firstNumber, operator, secondNumber));
        display.textContent = output;
        firstNumber = output;
        operator = element.className;
      } else {
        operator = element.className;
        display.textContent = output;
      }
    }
    flag = 1;
    periodElement.disabled = false;
    console.log(firstNumber);
    console.log(secondNumber);
  });
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "add":
      return add(firstNumber, secondNumber);
    case "subtract":
      return subtract(firstNumber, secondNumber);
    case "multiply":
      return multiply(firstNumber, secondNumber);
    case "divide":
      return divide(firstNumber, secondNumber);
  }
}
