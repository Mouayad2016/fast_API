/* User.js
  HTML-code to represent a "User-object"

*/
const formElement = document.querySelector("form.create__form");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

if(userId){
  getById(userId).then((user)=> {
    formElement.f_name.value = user.f_name;
    formElement.l_name.value = user.l_name;
    formElement.email.value = user.email;
    formElement.presentation.value = user.presentation;
  });
}
function renderUser(user) {
  return `
  <li class="card card-catalina-blue text-dark">
      <a class="card-link card-link-catalina-blue" href="./update.html?id=${user.id}">
      <span title="Uppdatera ${user.f_name} ${user.l_name}">Uppdatera</span></a>
      <span class="card-border card-border-left card-border-left-catalina-blue"></span>              
      <span class="card-border card-border-top card-border-top-catalina-blue"></span>
      <span class="card-border card-border-right card-border-right-catalina-blue"></span>
      <span class="card-border card-border-bottom card-border-bottom-catalina-blue"></span>
      <span class="card-fill"></span>
      <div class="card-img">
          <img class="card-img-base" src="./img/svg/profile.svg" alt="...">
          <img class="card-img-color" src="./img/svg/profile_catalina-blue.svg" alt="...">
          <img class="card-img-grad" src="./img/svg/profile_catalina-blue-grad.svg" alt="...">
      </div>
      <div class="card-body">
          <h5 class="card-title card-title-razzmatazz">${user.f_name} ${user.l_name}</h5>
          <p class="card-text">${user.presentation}</p>
      </div>
      <p class="card-text card-email card-email-persian-green"><a href="mailto:${user.email}" title="Mejla ${user.f_name} ${user.l_name}">${user.email}</a></p>
  </li>
`;
}

function createUser(event){
  event.preventDefault();
  //när vi klickar på knappen "Create"
  //hämta data från fält
  const user = {
    f_name: formElement.f_name.value,
    l_name: formElement.l_name.value,
    email: formElement.email.value
  };
  //anropa api funktionen create och skicka med objektet
  create(user)
    .then((result) =>{
      //dirigera användaren till read
      window.location.href = '/read.html';
    })
    .catch((error) =>{
      console.log(error);
    }); 
}

