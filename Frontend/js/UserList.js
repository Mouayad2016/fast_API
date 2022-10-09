const userContainer = document.querySelector('ul.gallery');

getAllJSON().then((users) => {
    //loopa igenom arrayen
    users.forEach((user) =>{
        //för varje user, anropa render user
        //skicka med aktuell user i loopen
        const userHTML = renderUser(user);
        //lätt till varje user i containern
        userContainer.insertAdjacentHTML('beforeend', userHTML);
    });
});



