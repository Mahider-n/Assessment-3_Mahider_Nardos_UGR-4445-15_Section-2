// Calculator program
document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    function appendToDisplay(input) {
        display.value += input;
    }
    function clearDisplay() {
        display.value = "";
    }
    function evaluateExpression(expression) {
        
        if (!expression) return "Error";
        const operators = [];
        const numbers = [];
        let currentNumber = "";

        for (let char of expression) {
            if ("+-*/".includes(char)) {
                if (currentNumber === "") return "Error";  
                numbers.push(parseFloat(currentNumber));
                currentNumber = "";
                operators.push(char);
            } else if (!isNaN(char)) {
                currentNumber += char;
            } else {
                return "Error";
            }
        }
        if (currentNumber === "") return "Error";
        numbers.push(parseFloat(currentNumber));

        //  Handle multiplication and division
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === "*" || operators[i] === "/") {
                const result =
                    operators[i] === "*"
                        ? numbers[i] * numbers[i + 1]
                        : numbers[i] / numbers[i + 1];
                numbers.splice(i, 2, result);
                // removing operator so that oprators are sequentially prossessed
                operators.splice(i, 1); 
                i--;
            }
        }

        // Handle addition and subtraction
        while (operators.length > 0) {
            const result =
                operators[0] === "+"
                    ? numbers[0] + numbers[1]
                    : numbers[0] - numbers[1];
            numbers.splice(0, 2, result);
            operators.shift();
        }
        return numbers[0];
    }
    const buttonsContainer = document.getElementById('buttons');
    buttonsContainer.addEventListener('click', function (event) {
        const button = event.target;

        if (button.classList.contains('btn')) {
            const value = button.getAttribute('data-value');
            if (button.id === "clear") {
                clearDisplay();
            } else if (button.id === "equals") {
                const result = evaluateExpression(display.value);
                display.value = result !== undefined ? result : "Error";
            } else {
                appendToDisplay(value);
            }
        }
    });
});





