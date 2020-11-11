// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})


const loginElem = document.querySelector('.login'),
    loginForm = document.querySelector('.login-form'),
    emailInput = document.querySelector('.login-email'),
    passwordInput = document.querySelector('.login-password'),
    loginSignup = document.querySelector('.login-signup'),
    userElem = document.querySelector('.user'),
    userNameElem = document.querySelector('.user-name');


const listUsers = [
  {
    id: '01',
    email: 'mike@mail.com',
    password: '12345',
    displayName: 'MikeJS'
  },
  {
    id: '02',
    email: 'Vera@mail.com',
    password: '123456',
    displayName: 'VeraJS'
  },
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    //console.log('Login');
    //console.log(email, password);
    const user = this.getUser(email);
    if (user && user.password === password){
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut() {
    console.log('LogOut');
  },
  signUp(email, password, handler) {
    //console.log('SignIn');
    if (!this.getUser(email)){
      const user = {email, password, displayName: email.split('@')[0]};//можно еще через slice
      listUsers.push(user);
      this.authorizedUser(user);
      console.log(listUsers);
      handler();
    } else {
      alert('Пользователь с таким емейл уже зарегестрирован');
    }
    if (!validateEmail(email)){
      alert('Введите корректный email');
      emailInput.value = '';
      passwordInput.value = '';
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user:', user);

  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}


loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //console.log(loginForm.elements);
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

loginSignup.addEventListener('click', (e) => {
  e.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});

toggleAuthDom();





