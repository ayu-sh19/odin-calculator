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
display.textContent = "0";

let firstNumber = "";
let secondNumber = "";
let operator;

let count = 0;
let output = 0;
let flag = 1;

let periodFlag = false;
let restrictFlag = false;
let signFlag = false;

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
  element.addEventListener("click", (event) => {
    if (restrictFlag == false) {
      if (element.className == "period") {
        element.disabled = true;
      }

      if (flag == 1) {
        display.textContent = obj[element.className];
        flag = 0;
      } else {
        display.textContent += obj[element.className];
      }
    }
    if (display.textContent.length == 10) {
      restrictFlag = true;
    }
  });
});

display.addEventListener("mousedown", (event) => {});

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = 0;
  secondNumber = 0;
  count = 0;
  restrictFlag = false;
  flag = 1;
});

const signBtn = document.querySelector(".sign");
signBtn.addEventListener("click", () => {
  display.textContent = -1 * parseInt(display.textContent);
  if (operator == "equal") {
    firstNumber = -1 * firstNumber;
  }
});

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
});

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
        output =
          parseFloat(operate(firstNumber, operator, secondNumber)).toFixed(4) *
          1;

        if (output > 1e9) {
          output = output.toExponential(2);
        }

        display.textContent = output;
        firstNumber = output;
        // firstNumber = !signFlag ? output : -1*output;
        operator = element.className;
      } else {
        operator = element.className;
        display.textContent = output;
      }
    }

    flag = 1;
    periodElement.disabled = false;
    restrictFlag = false;
    console.log(firstNumber);
    console.log(secondNumber);
  });
});

// console.log(display.textContent.length);

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
