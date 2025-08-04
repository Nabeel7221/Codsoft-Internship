class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.shouldResetDisplay = false;
        this.lastOperation = '';

        this.initEventListeners();
    }

    initEventListeners() {
        // Button click events
        const buttons = document.querySelectorAll('button');
        for (let button of buttons) {
            button.addEventListener('click', (e) => {
                this.handleButtonPress(e.target);
            });
        }

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // Prevent default behavior for certain keys
        document.addEventListener('keydown', (e) => {
            if (['+', '-', '*', '/', '=', 'Enter', 'Escape'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }

    handleKeyPress(e) {
        const key = e.key;
        let button = null;

        // Find corresponding button
        if (key >= '0' && key <= '9') {
            button = document.querySelector(`button[data-key="${key}"]`);
        } else if (key === '.') {
            button = document.querySelector('button[data-key="."]');
        } else if (key === '+') {
            button = document.querySelector('button[data-key="+"]');
        } else if (key === '-') {
            button = document.querySelector('button[data-key="-"]');
        } else if (key === '*') {
            button = document.querySelector('button[data-key="*"]');
        } else if (key === '/') {
            button = document.querySelector('button[data-key="/"]');
        } else if (key === '%') {
            button = document.querySelector('button[data-key="%"]');
        } else if (key === 'Enter' || key === '=') {
            button = document.querySelector('button[data-key="Enter"]');
        } else if (key === 'Escape') {
            button = document.querySelector('button[data-key="Escape"]');
        } else if (key === 'Backspace') {
            button = document.querySelector('button[data-key="Backspace"]');
        }

        if (button) {
            this.animateButton(button);
            this.handleButtonPress(button);
        }
    }

    animateButton(button) {
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 100);
    }

    handleButtonPress(button) {
        const value = button.textContent;
        const dataKey = button.getAttribute('data-key');

        if (button.classList.contains('number')) {
            this.inputNumber(value);
        } else if (button.classList.contains('decimal')) {
            this.inputDecimal();
        } else if (button.classList.contains('operator') && value !== '⌫') {
            this.inputOperator(value);
        } else if (button.classList.contains('equals')) {
            this.calculate();
        } else if (button.classList.contains('clear')) {
            this.clear();
        } else if (value === '⌫') {
            this.backspace();
        }

        this.updateDisplay();
    }

    inputNumber(num) {
        if (this.shouldResetDisplay) {
            this.currentInput = '';
            this.shouldResetDisplay = false;
        }

        // Limit input length to 12 characters
        if (this.currentInput.length >= 12) {
            return;
        }

        if (this.currentInput === '0') {
            this.currentInput = num;
        } else {
            this.currentInput += num;
        }
    }

    inputDecimal() {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }

        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
    }

    inputOperator(op) {
        if (this.operator && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.previousInput = this.currentInput;
        this.operator = op === '×' ? '*' : op;
        this.shouldResetDisplay = true;
    }

    calculate() {
        if (!this.operator || !this.previousInput) return;

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        let result;

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.displayError('Cannot divide by zero');
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        // Round to avoid floating point precision issues
        result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;

        this.currentInput = result.toString();
        this.lastOperation = `${this.previousInput} ${this.operator === '*' ? '×' : this.operator} ${current} = ${result}`;
        this.operator = '';
        this.previousInput = '';
        this.shouldResetDisplay = true;
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.shouldResetDisplay = false;
        this.display.classList.remove('error');
    }

    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
    }

    displayError(message) {
        this.display.textContent = message;
        this.display.classList.add('error');
        setTimeout(() => {
            this.clear();
            this.updateDisplay();
        }, 2000);
    }

    updateDisplay() {
        if (this.display.classList.contains('error')) return;

        let displayValue = this.currentInput;

        // Format large numbers
        if (displayValue.length > 12) {
            const num = parseFloat(displayValue);
            if (!isNaN(num)) {
                displayValue = num.toExponential(6);
            }
        }

        this.display.textContent = displayValue;
    }
}

// Initialize calculator when page loads
window.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

// Focus the document to ensure keyboard events work
document.addEventListener('DOMContentLoaded', () => {
    document.body.focus();
});

