//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Event Listeners
eventListener();

function eventListener() {
  formulario.addEventListener("submit", agregarTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    crearHTML();
  });
}

//Funciones
function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;

  //validacion
  if (tweet === "" || tweet.length < 5) {
    console.log("No vacio");
    mostrarError("El tweet debe tener almenos 5 caracteres");
    return;
  }

  tweetObj = {
    id: Date.now(),
    tweet,
  };

  //añadir al arreglo
  tweets = [...tweets, tweetObj];

  //Crear HTML
  crearHTML();
  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 2000);
}

function crearHTML() {
  borrarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      const li = document.createElement("li");
      btnEliminar.textContent = "X";

      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      li.innerText = tweet.tweet;
      li.appendChild(btnEliminar);

      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Agrega los tweets a LocalStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  console.log(tweets);
  console.log(id);
  crearHTML();
}
function borrarHTML() {
  listaTweets.innerHTML = "";
}
