const UI = require('./ui');
const Github = require('./github');

const {client_id, client_secret} =require('./config.json');

const github = new Github(client_id,client_secret);
const iu = new UI();

// elementos del DOM
const userForm = document.getElementById('userFormulario')

// eventos del DOM
userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const textSearch = document.getElementById('textSearch').value;
    if (textSearch !== '') {
        github.fetchUser(textSearch)
        .then(data => {
            console.log(data)
            if (data.userData.message === "Not Found") {
                iu.showMessage('User not Found', 'alert alert-danger mt-2 col-md-12');
                console.log('usuario no existe')
            }else {
                iu.showProfile(data.userData);
                iu.showRepositories(data.repositories);
            }
        }
    )}
});