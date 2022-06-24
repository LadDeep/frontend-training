const VALID_PASSWORD = (/^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/);

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

const resetInputs = (inputs)=>{
    inputs.forEach(input => {
        if(input.parentElement.classList.contains('error'))
            input.parentElement.classList.remove('error')
        if(input.parentElement.classList.contains('success'))
            input.parentElement.classList.remove('success')
        if(input.parentElement.querySelector('small'))
            input.parentElement.querySelector('small').textContent ='';
    });
}

const checkPassword = (password)=>{
    if(!password){
        showError(passwordInput, "Password cannot be empty");
    } else if(!VALID_PASSWORD.test(password)){
        showError(passwordInput, "Password must have 8 characters and atleast 1 number");
    } else {
        showSuccess(passwordInput);
        return true;
    }
    return false;
};

const checkUsername = (username)=>{
    if(!username){
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

    let isValid = checkUsername(usernameInput.value) && checkPassword(passwordInput.value);
    if(isValid){
        // do something;
    }
})

formField.addEventListener('reset', (event)=>{
    resetInputs([usernameInput, passwordInput]);
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
