const userList = document.getElementById('user');
console.log(userList);
//lista befintliga users i dropdown
getAllJSON().then((users) => {
    //loopa igenom arrayen
    users.forEach((user) =>{
        //för varje user, anropa render user
        const currentUserHTML = `
        <option value=${user.email}> 
            ${user.f_name} ${user.l_name} 
        </option>`;
        
        userList.insertAdjacentHTML("beforeend", currentUserHTML);
        //lägg till för och efternamn i dropdown
    });
});


function deleteUser(event){
    event.preventDefault();
    //hämta data från fält
    const user = {
      email: userList.value
    };
    // anropa api funktionen create och skicka med objektet
    remove(user)
      .then((result) =>{
        //dirigera användaren till read
        window.location.href = '/read.html';
      })
      .catch((error) =>{
        console.log(error);
      }); 
}