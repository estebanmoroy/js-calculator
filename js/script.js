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
        while (lastItem(operatorStack) !== "(")
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
      return "Please enter a valid operation";
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
