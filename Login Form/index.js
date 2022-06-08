function checkPassword(){
    const passwordInput = document.getElementById('pwd').value;
    if(passwordInput.match(/^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/)){
        console.log("Matched!!")
    }
}

const login = document.getElementById('userLogin');
console.log(login);
login.addEventListener("submit", (e)=>{
    console.log("submit");
    checkPassword();
});    