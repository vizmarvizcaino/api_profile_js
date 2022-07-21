window.onload = function () {

let containerCard = document.querySelector('.container-card')

let button = document.querySelector('.button')
button.addEventListener("click", worthInput)

function worthInput () {
    let email = document.querySelector('.input-email').value 
    let discord = document.querySelector('.input-discord').value
    dataInput(email, discord)
}

function dataInput (email, discord) {
const header = {
    headers: {
        Email: email,
        'Discord-id': discord
    } 
}
requestApiGet(header)
.then(res => {
        renderHtml(res)
        console.log(res)
})
.catch(error => {
    console.log(error)
})

requestApiPatch(header)

}

function requestApiGet (header) {
    return new Promise((resolve, reject) => {
        axios.get('https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile', header)
        .then(response => {
            resolve(response.data)
        })       
    })   
}


function renderHtml (res) {
    console.log(res.level) 
    const createdAt = new Date(res.user.createdAt).toLocaleString();
    const lastLogin = new Date(res.user.lastLogin).toLocaleString();
    containerCard.innerHTML =`
        <div class="avatar">
            <div class="avatar-name">
            <p class="parrafos">Nombre completo:</p>
            <div class="full-name">${res.user.fullName}</div>
            </div>
            <img class="avatar-image" src="logo.png" alt="">
        </div>
        <p class="parrafos">Email de usuario:</p>
        <div class="email">${res.user.email}</div>
        <p class="parrafos">Nivel de usuario:</p>
        <div class="level">${res.level}</div>
        <p class="parrafos">Fecha creacion cuenta:</p>
        <div class="account-create">${createdAt}</div>
        <p class="parrafos">Ultimo acceso al sistema:</p>
        <div class="last-login">${lastLogin}</div>
        <p class="parrafos">Nombre de usuario discord:</p>
        <div class="name-discord">${res.discordUsername}</div>
        <p class="parrafos">Tus hobbies favoritos:</p>
        <div class="hobbiess">${res.user.hobbies}</div>
        <div class="Button-render">Deseas agregar tus hobbies?</div>
`
}

const url = 'https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile'
const hobbiess = {
    hobbies: "correr"
}
function requestApiPatch (header) {
    return new Promise((resolve, reject) => {
        axios.patch({
            url: url,
            header,
            body: {
                hobbiess
            }
        })
    })
}


}
// function requestApiGet (header) {
//     return new Promise((resolve, reject) => {
//         axios.get('https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile', header)
//         .then(response => {
//             resolve(response.data)
//         })       
//     })   
// }



// let email = gatome2000@hotmail.com
// let discord = 952321599065968721