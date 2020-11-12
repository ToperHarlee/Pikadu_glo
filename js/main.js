// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login'),
    loginForm = document.querySelector('.login-form'),
    emailInput = document.querySelector('.login-email'),
    passwordInput = document.querySelector('.login-password'),
    loginSignup = document.querySelector('.login-signup'),
    userElem = document.querySelector('.user'),
    userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit'),
    editElem = document.querySelector('.edit'),
    editContainer = document.querySelector('.edit-container'),
    editUserName = document.querySelector('.edit-username'),
    editPhotoUrl = document.querySelector('.edit-photo'),
    userAvatarElem = document.querySelector('.user-avatar');

const postWrapper = document.querySelector('.posts');

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
    if (!regExpValidEmail.test(email)){
      alert('Введите корректный email');
      return;
    }
    const user = this.getUser(email);
    if (user && user.password === password){
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut(handler) {
    //console.log('LogOut');
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    //console.log('SignIn');
    if (!regExpValidEmail.test(email)){
      alert('Введите корректный email');
      return;
    }
    if (!email.trim() || !password.trim()){
      alert('Ввелите данные');
      return;
    }
    if (!this.getUser(email)){
      //const user = {email, password, displayName: email.split('@')[0]};//можно еще через slice
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};//можно еще через slice
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
  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }

    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    handler();
  },
  getUser(email) {
    return listUsers.find(item => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбныетексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись емубукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился,запятой своего егоснова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстовipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составительагентство чтовопроса ведущими о решила одна алфавит!',
      tags: [
        'свежее',
        'новое',
        'горячее',
        'мое',
        'случайность'
      ],
      author: 'mike@mail.com',
      date: '11.11.2020, 20:54:00',
      like: 45,
      comments: 12
    },
    {
      title: 'Заголовок поста2',
      text: 'Далеко-далеко за словесными2 горами в стране2 гласных2 и согласных живут2 рыбныетексты2. Языком что рот маленький реторический вершину2 текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись емубукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился,запятой своего егоснова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстовipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составительагентство чтовопроса ведущими о решила одна алфавит!',
      tags: [
        'свежее',
        'новое',
        'мое',
        'случайность'
      ],
      author: 'Vera@mail.com',
      date: '13.11.2020, 20:54:00',
      like: 15,
      comments: 20
    },
    {
      title: 'Заголовок поста3',
      text: 'Далеко-далеко3 за словесными горами 3в стране гласных и согласных живут 3рыбныетексты. Языком что 3рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись емубукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился,запятой своего егоснова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстовipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составительагентство чтовопроса ведущими о решила одна алфавит!',
      tags: [
        'свежее',
        'новое',
        'мое',
        'случайность'
      ],
      author: 'Vera@mail.com',
      date: '19.11.2020, 20:54:00',
      like: 15,
      comments: 20
    }
  ]
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user:', user);

  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    //userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const showAllPosts = () => {
  let postsHTML = '';

  setPosts.allPosts.forEach(({title, text, date, tags, comments, author, like }) => {

    postsHTML += `
    <section class="post">
      <div class="post-body">
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${text}</p>
        <div class="tags">
          <a href="#" class="tag">${tags}</a>
          <!--<a href="#" class="tag">#свежее</a>-->
        </div>
        <!-- /.tags -->
      </div>
      <!-- /.post-body -->
      <div class="post-footer">
        <div class="post-buttons">
          <button class="post-button likes">
            <svg width="19" height="20" class="icon icon-like">
              <use xlink:href="img/icons.svg#like"></use>
            </svg>
            <span class="likes-counter">${like}</span>
          </button>
          <button class="post-button comments">
            <svg width="21" height="21" class="icon icon-comment">
              <use xlink:href="img/icons.svg#comment"></use>
            </svg>
            <span class="comments-counter">${comments}</span>
          </button>
          <button class="post-button save">
            <svg width="19" height="19" class="icon icon-save">
              <use xlink:href="img/icons.svg#save"></use>
            </svg>
          </button>
          <button class="post-button share">
            <svg width="17" height="19" class="icon icon-share">
              <use xlink:href="img/icons.svg#share"></use>
            </svg>
          </button>
        </div>
        <!-- /.post-buttons -->
        <div class="post-author">
          <div class="author-about">
            <a href="#" class="author-username">${author}</a>
            <span class="post-time">${date}</span>
          </div>
          <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
        </div>
        <!-- /.post-author -->
      </div>
      <!-- /.post-footer -->
    </section>
    `;

  });

  postWrapper.innerHTML = postsHTML;
}

const init = () => {

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log(loginForm.elements);
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  loginSignup.addEventListener('click', (e) => {
    e.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', (e) => {
    e.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener('click', (e) => {
    e.preventDefault();
    editContainer.classList.toggle('visible');
    editUserName.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', evt => {
    evt.preventDefault();
    setUsers.editUser(editUserName.value, editPhotoUrl.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  // отслеживаем клик по кнопке меню и запускаем функцию
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню
    menu.classList.toggle('visible');
  });

  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});






