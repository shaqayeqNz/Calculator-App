const calculateScreen = document.querySelector('.calculate');
const resultScreen = document.querySelector('.result');

// Variable to store the calculation value
let calculateValue = '';

// Array of valid operators
const operators = ['%', '/', '*', '+', '-'];

// Function called when a number is pressed
function tapNum(numValue) {

    // If a result is already displayed and user starts typing a new number,
    // start a new calculation
    if (
        resultScreen.textContent !== '' &&
        resultScreen.textContent !== 'Error'
    ) {
        calculateValue = '';
        resultScreen.textContent = '';
    }

    // Prevent a decimal point from being added when the
    // calculation string is empty
    if (calculateValue === '' && numValue === '.') {
        return;
    }

    // Prevent multiple decimal points in the same number
    if (numValue === '.') {
        const parts = calculateValue.split(/[\+\-\*\/%]/);

        if (parts[parts.length - 1].includes('.')) {
            return;
        }
    }

    // Add the number to the calculation screen
    addCalculateScreen(numValue);
}

// Function called when an operator is pressed
function tapOperator(operatorValue) {

    // Do not allow an operator if the calculation is empty
    if (calculateValue === '') {
        return;
    }

    // If there is a previous result and it's not an error,
    // use that result as the starting value
    if (
        resultScreen.textContent !== '' &&
        resultScreen.textContent !== 'Error'
    ) {
        calculateValue = resultScreen.textContent;
        resultScreen.textContent = '';
    }

    // Prevent consecutive operators
    if (operators.includes(calculateValue.at(-1))) {
        return;
    }

    addCalculateScreen(operatorValue);
}

// Function called when the equals (=) button is pressed
function tapResult() {

    // Prevent calculation ending with an operator
    if (
        calculateValue === '' ||
        operators.includes(calculateValue.at(-1))
    ) {
        return;
    }

    try {
        resultScreen.textContent = eval(calculateValue);
    } catch (e) {
        resultScreen.textContent = 'Error';
    }
}

// Function called when the clear (AC) button is pressed
function tapClear() {

    calculateValue = '';

    calculateScreen.textContent = '';
    resultScreen.textContent = '';
}

// Function called when the delete (DEL) button is pressed
function tapDel() {

    calculateValue = calculateValue.slice(0, -1);

    resultScreen.textContent = '';
    calculateScreen.textContent = calculateValue;
}

// Function to add a value to the calculation screen
function addCalculateScreen(value) {

    calculateValue += value;

    calculateScreen.textContent = calculateValue;
}