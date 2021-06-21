

const numbers = document.querySelectorAll('#number_button');
const operators = document.querySelectorAll('#operator_button');
const display_value = document.querySelector('.input_button');
const clear_button = document.querySelector('.clear');
const delete_button = document.querySelector('.delete');
const dot_button = document.querySelector('#dot_button');
const equal_to = document.getElementById('answer_button');



let first_Number = '';
let second_number = '';
let currrent_operator = ''


window.addEventListener('keydown', keyboard_input);
equal_to.addEventListener('click', evaluate);
clear_button.addEventListener('click', clear);
delete_button.addEventListener('click', remove);
dot_button.addEventListener('click', add_dot);

numbers.forEach((button) => button.addEventListener('click', function(){
    get_number(button.value)
}));

operators.forEach((currentElement) => currentElement.addEventListener('click', function(){
        get_operator(currentElement.textContent);
}));



// .......................Functions ..................... //

// Number
function get_number(number){
    if (currrent_operator !== '') {
        if ( second_number.length > 14) {
            alert('Cannot exceed limit of 15');
            return;
        }
        second_number += number;
        display_screen();
    } else {
        if ( first_Number.length > 14) {
            alert('Cannot exceed limit of 15');
            return;
        }
        first_Number += number;
        display_screen(); 
    }
}


//  opertator
function get_operator(operator){
    if (currrent_operator !== '' && second_number !== '') {
        evaluate();
        currrent_operator = operator;
        display_screen();
    } else {
        if (first_Number === '') {
            return;
        }
        currrent_operator = operator;
        display_screen();
    }
};


// Evaluate function
function evaluate(){
    if (currrent_operator === '' || second_number === '' || first_Number === '') {
        return;
    }
    if (second_number === '0' && currrent_operator === '/') {
        alert('cannot divide by 0');
        clear();
        currrent_operator = '';
        return; 
    } else {
        display_value.textContent = round_answer(operate(currrent_operator, first_Number, second_number)) ;
        first_Number = display_value.textContent;
        second_number = '';
        currrent_operator = '';
    }
}


// Operation Function
function operate(opr, a, b){
    if (opr == '+') {
        return add(a,b);
    } else if (opr == '-') {
        return subtract(a,b);
    } else if (opr == '*') {
        return multiply(a,b);
    } else if (opr == '/') {
        return divide(a,b);
    } 
}


// Clrear Function
function clear(){
    display_value.textContent = '';
    first_Number = '';
    second_number = '';
    currrent_operator = '';
}

// Delete Function
function remove(){ 
   
    if (second_number !== '') {
        second_number = second_number.slice(0, -1);
        display_screen();
        return;
    }
    if (currrent_operator !== '') {
        currrent_operator = '';
        display_screen();
        return;
    }
    if (first_Number !== '') {
        first_Number= first_Number.slice(0, -1);
        display_screen();
        return;
    }
}


// dot value function
function add_dot(){
    if (currrent_operator === '') {
        if (!first_Number.includes('.')) {
            first_Number += dot_button.value;
            display_screen();
            return;
        }  
    } else {
        if (!second_number.includes('.')) {
            second_number += dot_button.value;
            display_screen();
            return;
        }
    }
}

// Display Screen 
function display_screen(){
    display_value.textContent = `${first_Number} ${currrent_operator} ${second_number}`;
}

// Round the answer
function round_answer(number){
    return Math.round(number * 1000)/ 1000;
}


// Basic Maths Operator Functions
function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

// Keyboard Functions
function keyboard_input(e){
    if (e.key >= 0 && e.key <= 9) get_number(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') get_operator(e.key);
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') remove();
    if (e.key === '.') add_dot();
    if (e.key === "Escape") clear();
}


