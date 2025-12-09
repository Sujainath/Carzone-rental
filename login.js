const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})


// Auth
 const auth = getAuth();

 //Register//4

 function register(username, email, password) {
      return createUserWithEmailAndPassword(auth, username, email, password)
 }