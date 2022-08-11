class UserService {
  username = null;
  password = null;
  constructor(username, password) {
    UserService.username = username;
    UserService.password = password;
  }
  //функции-геттеры я заменил на функции-сеттеры, защищающие от изменения данных не через форму отправки данных
  set username (pwd) {
    return 'You are not allowed to change username';
  }
  
  set password (pwd) {
    return 'You are not allowed to set password';
  }
  
  static authentificate_user() { 
     return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `https://httpbin.org/anything?username=${UserService.username}&password=${UserService.password}`, true);
      xhr.responseType = 'json';
      xhr.onload = () => {
          if (xhr.status === 200) { resolve() }
          else (reject(xhr.response));
      } 
      xhr.send();
    });
  }
}

$('form').submit((event)=>{
  event.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();
  
  let data = new UserService(username, password);
  let res = UserService.authentificate_user()
  .then(result => {
    document.location.href = '/home';
  },
  err => alert(err));
})
