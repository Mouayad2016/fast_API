const formElement = document.querySelector("form.create__form")
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');


if(userId){
    getById(userId).then((user) =>{
      formElement.f_name.value = user.f_name;
      formElement.l_name.value = user.l_name;
      formElement.email.value = user.email;
      formElement.presentation.value = user.presentation;
    });
  }

  function updateUser(event){
    event.preventDefault();
    //när vi klickar på knappen "Create"
    //hämta data från fält
    const user = {
      id: userId,
      f_name: formElement.f_name.value,
      l_name: formElement.l_name.value,
      email: formElement.email.value,
      presentation: formElement.presentation.value
    };
    //anropa api funktionen create och skicka med objektet
    update(user)
      .then((result) =>{
        console.log(result);
        //dirigera användaren till read
        window.location.href = '/read.html';
      })
      .catch(error =>{
        console.log(error);
      }); 
  }