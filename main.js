function main() {
  let template = document.querySelector('.template').content
  let perfilUsuarioFooter = document.querySelector('.seccion-perfil-usuario')
  let containerHobbies = document.querySelector('.container-hobbies')
  let formBody = document.querySelector('.form-body')
  const API_URL = 'https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile';
  const loader = document.querySelector('.loader')
  let showInputHobbiess = document.querySelector('.input-hobbies')
  let email = ''
  let discord = ''

  let botonHobbies = document.querySelector('.boton-hobbies');
  botonHobbies.addEventListener('click', inputDataHobbies);

  function inputDataHobbies() {
    let inputHobbies = document.querySelector('.input-hobbies').value
    const list = showInputHobbiess.classList;
    list.toggle("hidden");
    window.location.reload();
    requestApiPatch(inputHobbies)
  }

  let botonIngreso = document.querySelector('.boton-ingreso')
  botonIngreso.addEventListener("click", dataInputLogin)

  function dataInputLogin(e) {
    e.preventDefault()
    email = document.querySelector('.input-email').value
    discord = document.querySelector('.input-discord').value
    loader.style.display = 'block'
    formBody.style.display = 'none'
    dataHeaders(email, discord)
  }

  function dataHeaders() {
    const options = {
      headers: {
        Email: email,
        'Discord-id': discord
      }
    }
    localStorage.setItem('options', JSON.stringify(options))
    requestApiGet(email, discord)
      .then(res => {
        botonHobbies.style.display = 'block'
        containerHobbies.style.visibility = 'visible'
        loader.style.display = 'none'
        renderHtml(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function requestApiGet(email, discord) {
    let options = JSON.parse(localStorage.getItem('options'))
    return new Promise((resolve, reject) => {
      axios.get(API_URL, options)
        .then(response => {
          resolve(response.data)
        })
    })
  }

  function renderHtml(res) {
    const createdAt = new Date(res.user.createdAt).toLocaleString();
    const lastLogin = new Date(res.user.lastLogin).toLocaleString();
    template.querySelector(".titulo").textContent = `${res.user.fullName}`
    template.querySelector(".email").textContent = `Email: ${res.user.email}`
    template.querySelector(".nivel").textContent = `Nivel: ${res.level}`
    template.querySelector(".usuario-discord").textContent = `discord: ${res.discordUsername}`
    template.querySelector(".generacion").textContent = `Generacion: ${res.batch}`
    template.querySelector(".fecha-creacion").textContent = `Fecha de creacion: ${createdAt}`
    template.querySelector(".ultimo-ingreso").textContent = `Ultimo ingreso: ${lastLogin}`
    template.querySelector(".hobbies").textContent = `Hobbies: ${res.hobbies}`
    const clone = document.importNode(template, true)
    perfilUsuarioFooter.append(clone);
  }

  function requestApiPatch(inputHobbies) {
    let options = JSON.parse(localStorage.getItem('options'))
    const payload = {
      hobbies: inputHobbies
    }
    return new Promise((resolve, reject) => {
      axios.patch(API_URL, payload, options)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
        });
    })
  }


}

window.onload = function () {
  main()
}