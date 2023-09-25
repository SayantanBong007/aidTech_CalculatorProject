// Selecting elements
const inputDisplay = document.querySelector('.input');
const outputDisplay = document.querySelector('.output');
const keys = document.querySelectorAll('.key');

let currentInput = '';
let currentOutput = '';
let previousResult = null; // Variable to store the previous result
let openBracket = true; // Variable to keep track of parentheses state

// Helper function to update the input display
function updateInputDisplay() {
    inputDisplay.textContent = currentInput;
}

// Helper function to update the output display
function updateOutputDisplay() {
    outputDisplay.textContent = currentOutput;
}

// Select the theme switch button
const themeSwitchButton = document.getElementById('theme-switch-button');

// Function to toggle the dark theme
function toggleDarkTheme() {
    const calculator = document.querySelector('.calculator');
    const keys = document.querySelector('.keys');

    // Toggle the dark-theme class on calculator and keys
    calculator.classList.toggle('dark-theme');
    keys.classList.toggle('dark-theme');
}

// Event listener for theme switch button
themeSwitchButton.addEventListener('click', toggleDarkTheme);

// Helper function to handle numeric and operator keys
function handleNumericOrOperatorKey(keyValue) {
    if (previousResult !== null) {
        // Allow operations with the previous result
        currentInput = previousResult + keyValue;
        previousResult = null; // Clear the previous result
    } else {
        currentInput += keyValue;
    }
}

// Event listener for key clicks
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.dataset.key;

        switch (keyValue) {
            case '=':
                try {
                    previousResult = eval(currentInput);
                    currentOutput = previousResult;
                    currentInput = '';
                } catch (error) {
                    currentOutput = 'Error';
                }
                break;
            case 'clear':
                currentInput = '';
                currentOutput = '';
                previousResult = null;
                break;
            case 'backspace':
                currentInput = currentInput.slice(0, -1);
                break;
            case 'brackets':
                // Toggle between opening and closing parentheses
                currentInput += openBracket ? '(' : ')';
                openBracket = !openBracket;
                break;
            case '%':
                currentInput += '/100*';
                break;
            default:
                if (!isNaN(keyValue) || keyValue === '.' || '+-*/'.includes(keyValue)) {
                    handleNumericOrOperatorKey(keyValue);
                }
        }

        // Update displays
        updateInputDisplay();
        updateOutputDisplay();
    });
});

// Initialize displays
updateInputDisplay();
updateOutputDisplay();
