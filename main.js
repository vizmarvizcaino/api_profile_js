function main () { 

    let containerCard = document.querySelector('.seccion-perfil-usuario')
    const API_URL = 'https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile';
    const loader = document.querySelector('.loader')
    let email = ''
    let discord = ''
    let inputHobbies = ''
    
    let botonHobbies = document.querySelector('.boton-hobbies')
        botonHobbies.addEventListener('click', inputDataHobbies)
  
    function inputDataHobbies () { 
      inputHobbies = document.querySelector('.input-hobbies').value
      alert('por favor refresca el navegador para ver los cambios')
      requestApiPatch(inputHobbies)
    }
    
    let botonIngreso = document.querySelector('.boton-ingreso')
    botonIngreso.addEventListener("click", dataInputLogin)
    
    function dataInputLogin (e) {
      e.preventDefault()
      email = document.querySelector('.input-email').value
      discord = document.querySelector('.input-discord').value
      loader.style.display = 'block'
      dataHeaders(email, discord)
    }
  
  function dataHeaders () {
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
      containerCard.innerHTML = `
      <div class="perfil-usuario-header">
      <div class="perfil-usuario-portada">
        <div class="perfil-usuario-avatar">
          <img class="logo" src="219983.png" alt="img-avatar">
          <button type="button" class="boton-avatar">
            <i class="far fa-image"></i>
          </button>
        </div>
        <button type="button" class="boton-portada">
          <i class="far fa-image"></i> Cambiar fondo
        </button>
      </div>
    </div>
    <div class="perfil-usuario-body">
      <div class="perfil-usuario-bio">
        <h3 class="titulo">${res.user.fullName}</h3>
        <p class="texto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="perfil-usuario-footer">
        <ul class="lista-datos">
          <li><i class="icono fas fa-envelope"></i> Email: ${res.user.email}</li>
          <li><i class="icono fas fa-graduation-cap"></i> Nivel: ${res.level}</li>
          <li><i class="icono fas fa-user-check"></i>Usuario Discord: ${res.discordUsername}</li>
          <li><i class="icono fas fa-user-graduate"></i> Generacion: ${res.batch}</li>
        </ul>
        <ul class="lista-datos">
          <li><i class="icono fas fa-calendar-alt"></i> Fecha de creacion: ${createdAt}</li>
          <li><i class="icono fas fa-calendar-alt"></i> Ultimo ingreso: ${lastLogin}</li>
          <li><i class="icono fas fa-angellist"></i> Hobbies: ${res.hobbies}</li>
        </ul>
        </div>
      <div class="redes-sociales">
        <a href="https://www.facebook.com" class="boton-redes facebook fab fa-facebook-f"><i
            class="icon-facebook"></i></a>
        <a href="https://twitter.com" class="boton-redes twitter fab fa-twitter"><i class="icon-twitter"></i></a>
        <a href="https://www.instagram.com" class="boton-redes instagram fab fa-instagram"><i
            class="icon-instagram"></i></a>
      </div>
    </div>
      `
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