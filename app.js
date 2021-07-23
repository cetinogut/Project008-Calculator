// Variables
const previousElement = document.querySelector(".previous-display");
const currentElement = document.querySelector(".current-display");

const acButton = document.querySelector(".ac");
const pmButton = document.querySelector(".pm");
const percentButton = document.querySelector(".percent");
const backSpace = document.querySelector(".backSpace");

const additionButton = document.querySelector(".addition");
const subtractionButton = document.querySelector(".subtraction");
const multiplicationButton = document.querySelector(".multiplication");
const divisionButton = document.querySelector(".division");
const equalsButton = document.querySelector(".equals");



const decimalButton = document.querySelector(".decimal");
const number0 = document.querySelector(".number-0");
const number1 = document.querySelector(".number-1");
const number2 = document.querySelector(".number-2");
const number3 = document.querySelector(".number-3");
const number4 = document.querySelector(".number-4");
const number5 = document.querySelector(".number-5");
const number6 = document.querySelector(".number-6");
const number7 = document.querySelector(".number-7");
const number8 = document.querySelector(".number-8");
const number9 = document.querySelector(".number-9");
const numbersArray = [
  number0,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
];

let previousOperand = "";
let currentOperand = "";
let operation = undefined;
let temporaryOperand = "";

// Functions

function DisplayNumbers() {
  if (operation) {
    previousElement.innerHTML = `${previousOperand} ${operation}`;
  } else {
    previousElement.innerHTML = previousOperand;
  }
  currentElement.innerHTML = currentOperand;
}

function AppendNumber(number) {
 
  if (number === "." && currentOperand.includes(".")) return;
  if (number === 0 && currentOperand === "0") return;
  if (currentOperand.length > 7) return; // max 7 digits

  currentOperand = currentOperand.toString() + number.toString();

  DisplayNumbers();
}

function ChooseOperation(selectedOperation) {
  if(operation){return}; // if there is an chosen operation already, do nothing for an extra operation hit.
  if (temporaryOperand) {
    previousOperand = temporaryOperand.toString();
    currentOperand = "";
    temporaryOperand = "";
    operation = selectedOperation;
    DisplayNumbers();
    return;
  }
  
  operation = selectedOperation;
  previousOperand = currentOperand;
  acButton.innerHTML = "AC";
  currentOperand = "";

  DisplayNumbers();
}

function Compute() {
  let computation;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (!operation) return;
  if (isNaN(previous) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = parseFloat(ResultHasDecimal(previous + current));
      break;

    case "-":
      computation = parseFloat(ResultHasDecimal(previous - current));
      break;

    case "÷":
      computation = (previous / current);
      
      computation = parseFloat(ResultHasDecimal(previous / current));
      
       
      break;

    case "*":
      //computation = previous * current;
      computation = parseFloat(ResultHasDecimal(previous * current));
      break;

    default:
      break;
  }



  if (isNaN(computation)) return;

  currentOperand = computation;
  previousOperand = "";
  operation = undefined;
  DisplayNumbers();
  temporaryOperand = currentOperand;
  currentOperand = "";
}

function ResultHasDecimal (num) {  // num % 1 != 0 // js check if number has decimals
	 return (num % 1) ? num.toFixed(4) : num; // this is one line of code for the following func.
  //  if (num % 1){
  //         console.log("kesirli")
  //         console.log(num + "before")
  //         num = num.toFixed(4);
  //         console.log(num);
  //       } else {
  //         console.log("tam sayı")
  //       }
  //       console.log(num + "before return")
  //   return num;
}

function AllClear() {
  if (!previousOperand) {
    currentOperand = currentOperand.slice(0, currentOperand.length - 1);
  } else {
    previousOperand = "";
    currentOperand = "";
    operation = undefined;
    acButton.innerHTML = "C";
  }

  DisplayNumbers();
}

function ClearLast(){

  // console.log({temporaryOperand});
  // console.log({currentOperand})

  if( previousOperand && operation && currentOperand){  // 66 + 5 -> will delete 5
    currentOperand = currentOperand.slice(0, currentOperand.length - 1);
    
  } else if(previousOperand && operation){ // 66 + -> will delete operation then user either can type another operation or he/she can add or delete numbers from PreviousOperand
    console.log({temporaryOperand})
    console.log({previousOperand})
    operation ="";
    operation = undefined;
    currentOperand = previousOperand; //then user either can type another operation or he/she can add or delete numbers from PreviousOperand
    previousOperand = "";

  } else if(previousOperand){ // 66 most probably user will delete numbers and can add new ones if desired
    previousOperand = previousOperand.slice(0, previousOperand.length - 1);
  }
  // console.log({temporaryOperand});
  // console.log({currentOperand})
  // console.log({operation})
  
  DisplayNumbers();
}

function PlusMinus() {
  currentOperand = currentOperand * -1;
  DisplayNumbers();
}

function Percent() {
  currentOperand = currentOperand / 100;
  DisplayNumbers();
}

// Add event listener to operator buttons

additionButton.addEventListener("click", () => {
  ChooseOperation("+");
});

subtractionButton.addEventListener("click", () => {
  ChooseOperation("-");
});

multiplicationButton.addEventListener("click", () => {
  ChooseOperation("*");
});

divisionButton.addEventListener("click", () => {
  ChooseOperation("÷");
});

equalsButton.addEventListener("click", () => {
  Compute();
});

// Add event listener to top buttons

acButton.addEventListener("click", () => {
  AllClear();
});

pmButton.addEventListener("click", () => {
  PlusMinus();
});

percentButton.addEventListener("click", () => {
  Percent();
});

// Add event listener to number buttons

for (let i = 0; i < numbersArray.length; i++) {
  const number = numbersArray[i];

  number.addEventListener("click", () => {
    AppendNumber(i);
    temporaryOperand = "";
  });
}

decimalButton.addEventListener("click", () => {
  AppendNumber(".");
});

backSpace.addEventListener("click", () => {
  ClearLast();
});
