const usernameInput = document.getElementById('uname');
const passwordInput = document.getElementById('password');

const formField = document.getElementById('userLogin');

const showError = (input, message) =>{
    const inputDiv = input.parentElement;
    console.log(inputDiv);
    inputDiv.classList.add('error');
    inputDiv.classList.remove('success');

    const errorMessageEle = inputDiv.querySelector('small');
    console.log(errorMessageEle);
    errorMessageEle.textContent = message;
}

const showSuccess = (input) =>{
    const inputDiv = input.parentElement;
    inputDiv.classList.add('success');
    inputDiv.classList.remove('error');

    const errorMessageEle = inputDiv.querySelector('small');
    console.log(errorMessageEle);
    errorMessageEle.textContent = '';
}

const isRequired = (input) => input === '' ? false : true;

const isPasswordValid = (input) => {
    return (/^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/).test(input);
};

const checkPassword = ()=>{
    const password = passwordInput.value;
    if(!isRequired(password)){
        showError(passwordInput, "Password cannot be empty");
    } else if(!isPasswordValid(password)){
        showError(passwordInput, "Password must have 8 characters and atleast 1 number");
    } else {
        showSuccess(passwordInput);
        return true;
    }
    return false;
};

const checkUsername = ()=>{
    const username = usernameInput.value;
    if(!isRequired(username)){
        showError(usernameInput, "Username is mandatory");
        return false;
    } else {
        showSuccess(usernameInput);
        return true;
    }
};

const debounce = (func, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay);
    };
};

formField.addEventListener('submit', (event)=>{
    event.preventDefault();

    let isValid;
    let hasUsername = checkUsername(), hasPass = checkPassword()
    isValid = hasUsername && hasPass;
})

const checkInputs = (input)=>{
    switch (input.target.id) {
        case 'uname':
            checkUsername();
            break;
        case 'password':
            checkPassword();
            break;
    }
}

formField.addEventListener('input', debounce(e => checkInputs(e)));
