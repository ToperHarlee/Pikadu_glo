// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAI_dPY-M9oRJtJosi_2L5tb51pOzVBNI",
    authDomain: "pikadu-b82de.firebaseapp.com",
    databaseURL: "https://pikadu-b82de.firebaseio.com",
    projectId: "pikadu-b82de",
    storageBucket: "pikadu-b82de.appspot.com",
    messagingSenderId: "191463317510",
    appId: "1:191463317510:web:dd9d2bca40a3354c376387"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

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

const postWrapper = document.querySelector('.posts'),
    buttonNewPost = document.querySelector('.button-new-post'),
    addPostElem = document.querySelector('.add-post');

const DEFAULT_PHOTO = userAvatarElem.src;

/*const listUsers = [
    {
        id: '01',
        email: 'mike@mail.com',
        password: '12345',
        displayName: 'MikeJS',
        photo: 'https://pbs.twimg.com/profile_images/2881220369/2b27ac38b43b17a8c5eacfc443ce3384_400x400.jpeg'
    },
    {
        id: '02',
        email: 'Vera@mail.com',
        password: '123456',
        displayName: 'VeraJS'
    },
];*/

const setUsers = {
    user: null,
    initUser(handler){
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.user = user;
            }else{
                this.user = null;
            }
            if(handler){
                handler();
            }
        })
    },
    logIn(email, password, handler){
        if (!regExpValidEmail.test(email)){
            alert('email не валиден');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(err => {
                const errCode = err.code;
                const errMessage = err.message;
                if(errCode === 'auth/wrong-password'){
                    console.log(errMessage);
                    alert('Неверный пароль')
                }else if(errCode === 'auth/user-not-found'){
                    console.log(errMessage);
                    alert('Пользователь не найден');
                }else{
                    alert(errMessage);
                }
                console.log(err);
            })


        // const user = this.getUser(email);
        // if(user && user.password === password){
        //   this.authorizedUser(user);
        //   if(handler){
        //     handler();
        //   }
        // } else {
        //   alert('Пользователь с такими данными не найден')
        // }
    },
    logOut(handler){
        firebase.auth().signOut()
            .then()
            .catch();

        // if(handler){
        //   handler();
        // }
    },
    signUp(email, password, handler){
        if (!regExpValidEmail.test(email)){
            alert('email не валиден');
            return;
        }
        if(!email.trim() || !password.trim()){
            alert('Введите данные')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(data =>{
                this.editUser(email.substring(0,email.indexOf('@')), null, handler);
            })
            .catch(err => {
                const errCode = err.code;
                const errMessage = err.message;
                if(errCode === 'auth/weak-password'){
                    console.log(errMessage);
                    alert('слишком простой пароль')
                }else if(errCode === 'auth/email-already-in-use'){
                    console.log(errMessage);
                    alert('Этот Email уже используется!');
                }else{
                    alert(errMessage);
                }
                console.log(err);
            });

        //   if (!this.getUser(email)){
        //     const user = {email, password, displayName: email.substring(0,email.indexOf('@'))};
        //     listUsers.push(user);
        //     this.authorizedUser(user);
        //     if(handler){
        //       handler();
        //     }
        //   } else {
        //     alert('Пользователь с таким email уже зарегестрирован')
        //   }

        /*if (!validateEmail(email)) {
        alert('Введите корректный email');
        emailInput.value = '';
        passwordInput.value = '';
        }*/
    },

    editUser(displayName, photoURL,handler){

        const user = firebase.auth().currentUser;

        if(displayName){
            if(photoURL){
                user.updateProfile({
                    displayName,
                    photoURL
                }).then(handler)
            } else {
                user.updateProfile({
                    displayName,
                }).then(handler)
            }
        }
    },

    // getUser(email){
    //   return listUsers.find((item)=> item.email === email)
    // },
    // authorizedUser(user){
    //   this.user = user;
    // }
    sendForget(email){
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('письмо отправлено');
            })
            .catch(err =>{
                console.log(err);
            })
    }
};

const loginForget = document.querySelector('.login-forget');
loginForget.addEventListener('click', event => {
    event.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = "";
})


const setPosts = {
    allPosts: [



        /*{
            title: 'Заголовок поста',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбныетексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись емубукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился,запятой своего егоснова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстовipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составительагентство чтовопроса ведущими о решила одна алфавит!',
            tags: [
                'свежее',
                'новое',
                'горячее',
                'мое',
                'случайность'
            ],
            author: {
                displayName: 'mike',
                photo: 'https://pbs.twimg.com/profile_images/2881220369/2b27ac38b43b17a8c5eacfc443ce3384_400x400.jpeg'
            },
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
            author: {
                displayName: 'Knopka',
                photo: 'data:image/jpeg;base64,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'
            },
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
            author: {
                displayName: 'Vera',
                photo: 'https://img.championat.com/s/735x490/news/big/w/c/samaja-seksualnaja-sportsmenka-mira-pokazala-foto-v-korotkih-shortah_15942771912132972713.jpg'
            },
            date: '19.11.2020, 20:54:00',
            like: 15,
            comments: 20
        }*/
    ],
    addPost(title, text, tags, handler) {

        const user = firebase.auth().currentUser;

        this.allPosts.unshift({
            id: `postID${(+new Date()).toString(16)}-${user.uid}`,
            title,
            text,
            tags: tags.split(',').map(item => item.trim()),
            author: {
                displayName: setUsers.user.displayName,
                photo: setUsers.user.photoURL
            },
            date: new Date().toLocaleString(),
            like: 0,
            comments: 0
        })

        firebase.database().ref('post').set(this.allPosts)
            .then(() => this.getPosts(handler))

        /*if (handler) {
            handler();
        }*/
    },
    getPosts(handler) {
        firebase.database().ref('post').on('value', snapshot => {
            this.allPosts = snapshot.val() || [];
            if (handler) {
                handler();
            }
        })
    }
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user:', user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        //userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
        userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;
        buttonNewPost.classList.add('visible');
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
        buttonNewPost.classList.remove('visible');
        addPostElem.classList.remove('visible');
        postWrapper.classList.add('visible');
    }
};

const showAddPost = () => {
    addPostElem.classList.add('visible');
    postWrapper.classList.remove('visible');
}

const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const showAllPosts = () => {

    let postsHTML = '';

    setPosts.allPosts.forEach(({title, text, date, tags, comments, author, like}) => {

        postsHTML += `
    <section class="post">
      <div class="post-body">
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${text}</p>
        <div class="tags">
          ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
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
            <a href="#" class="author-username">${author.displayName}</a>
            <span class="post-time">${date}</span>
          </div>
          <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
        </div>
        <!-- /.post-author -->
      </div>
      <!-- /.post-footer -->
    </section>
    `;

    });

    postWrapper.innerHTML = postsHTML;
    addPostElem.classList.remove('visible');
    postWrapper.classList.add('visible');
};

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
        setUsers.logOut();
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

    buttonNewPost.addEventListener('click', (e) => {
        e.preventDefault();
        showAddPost();
    });

    addPostElem.addEventListener('submit', (e) => {
        e.preventDefault();
        //const formElements = [...addPostElem.elements].filter(elem => elem.tagName !== 'BUTTON');
        const {title, text, tags} = addPostElem.elements;
        console.log(title, text, tags);

        if (title.value.length < 6) {
            alert('Слишком короткий заголовок');
            return;
        }

        if (text.value.length < 50) {
            alert('Слишком короткий пост');
            return;
        }
        setPosts.addPost(title.value, text.value, tags.value, showAllPosts());
        addPostElem.classList.remove('visible');
        addPostElem.reset();
    });

    setUsers.initUser(toggleAuthDom);
    setPosts.getPosts(showAllPosts);
    //showAllPosts();
    //toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});


//test
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
    } else {
        // User is signed out.
        // ...
    }
});



