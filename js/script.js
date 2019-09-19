/* Takes a regular mathematical expression and returns an array
with the RPN/postfix notation"*/
/* Implements the Shunting-yard Algorithm that parses an
infix notation to a Reverse Polish Notation
https://en.wikipedia.org/wiki/Shunting-yard_algorithm */
function shuntingYard(string) {
  let operatorStack = [];
  const operators = { "*": 3, "/": 3, "+": 2, "-": 2 };

  return string
    .split(" ")
    .reduce((output, e) => {
      if (parseFloat(e)) {
        output.push(e);
      }
      if (e in operators) {
        while (
          lastItem(operatorStack) in operators &&
          operators[lastItem(operatorStack)] >= operators[e]
        )
          output.push(operatorStack.pop());
        operatorStack.push(e);
      }
      if (e === "(") {
        operatorStack.push(e);
      }
      if (e === ")") {
        while (lastItem(operatorStack) !== "(" && operatorStack.length !== 0)
          output.push(operatorStack.pop());
        operatorStack.pop();
      }
      return output;
    }, [])
    .concat(operatorStack.reverse());
}

/*Calculates an expression in the Reverse Polish Notation*/
function calculateRPN(array) {
  return array
    .reduce((stack, e) => {
      if (!isNumber(e)) {
        let operand1 = stack.pop(lastItem(stack));
        let operand2 = stack.pop(lastItem(stack));
        stack.push(operate(e, operand2, operand1));
      } else {
        stack.push(e);
      }
      return stack;
    }, [])
    .join("");
}

function calculator(string) {
  return calculateRPN(shuntingYard(string));
}

function isNumber(param) {
  return !isNaN(parseFloat(param)) && isFinite(param);
}

function lastItem(array) {
  return array[array.length - 1];
}

function operate(operation, operand1, operand2) {
  switch (operation) {
    case "+":
      return add(parseFloat(operand1), parseFloat(operand2));
      break;
    case "-":
      return subtract(parseFloat(operand1), parseFloat(operand2));
      break;
    case "*":
      return multiply(parseFloat(operand1), parseFloat(operand2));
      break;
    case "/":
      return divide(parseFloat(operand1), parseFloat(operand2));
      break;
    default:
      return "Invalid operation";
      break;
  }
}

function add(addend1, addend2) {
  return addend1 + addend2;
}

function subtract(minueand, subtrahend) {
  return minueand - subtrahend;
}

function multiply(multiplicand, multiplier) {
  return multiplicand * multiplier;
}

function divide(dividend, divisor) {
  return dividend / divisor;
}

//Button binding
const $ = document.querySelector.bind(document);
const $$ = Array.from(document.querySelectorAll.bind(document));
const operationDisplay = $(".operation-display");
const currentNumberDisplay = $(".current-number-display");

function operatorToDisplay(operator, char) {
  $(`#${operator}`).addEventListener("click", () => {
    operationDisplay.textContent =
      operationDisplay.textContent +
      currentNumberDisplay.textContent +
      ` ${char} `;
    currentNumberDisplay.textContent = "";
  });
}

function numberToDisplay(number, char) {
  $(`#${number}`).addEventListener("click", () => {
    currentNumberDisplay.textContent = currentNumberDisplay.textContent + char;
  });
}

numberToDisplay("one", "1");
numberToDisplay("two", "2");
numberToDisplay("three", "3");
numberToDisplay("four", "4");
numberToDisplay("five", "5");
numberToDisplay("six", "6");
numberToDisplay("seven", "7");
numberToDisplay("eight", "8");
numberToDisplay("nine", "9");
numberToDisplay("zero", "0");
numberToDisplay("dot", ".");
operatorToDisplay("add", "+");
operatorToDisplay("subtract", "-");
operatorToDisplay("multiply", "*");
operatorToDisplay("divide", "/");
operatorToDisplay("left-parentheses", "(");
operatorToDisplay("right-parentheses", ")");

$("#equals").addEventListener("click", () => {
  if (
    currentNumberDisplay.textContent === "69" &&
    operationDisplay.textContent === ""
  ) {
    currentNumberDisplay.textContent = "nice.";
  } else {
    operationDisplay.textContent =
      operationDisplay.textContent + currentNumberDisplay.textContent;
    currentNumberDisplay.textContent = "";
    if (isNaN(calculator(operationDisplay.textContent))) {
      operationDisplay.textContent = "Invalid operation";
    } else {
      currentNumberDisplay.textContent = calculator(
        operationDisplay.textContent
      );
      operationDisplay.textContent = "";
    }
  }
});

$("#erase").addEventListener("click", () => {
  if (currentNumberDisplay.textContent !== "") {
    currentNumberDisplay.textContent = currentNumberDisplay.textContent.slice(
      0,
      -1
    );
  } else if (operationDisplay.textContent !== "") {
    if (
      operationDisplay.textContent.slice(
        operationDisplay.textContent.length - 1
      ) === " "
    ) {
      operationDisplay.textContent = operationDisplay.textContent.slice(0, -2);
    }
    operationDisplay.textContent = operationDisplay.textContent.slice(0, -1);
  }
});

$("#clear").addEventListener("click", () => {
  currentNumberDisplay.textContent = "";
  operationDisplay.textContent = "";
});
