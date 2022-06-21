const contenedorPokemon = document.querySelector(".contenedor-pokemon")
const spinner = document.querySelector('#spinner');
const previous = document.querySelector("#previo");
const next = document.querySelector("#siguiente");

let offset = 1
let limit = 11

//evento de boton anterior
previo.addEventListener("click", () => {
    if (offset != 1){
        offset -= 11;
        removiendoContenidoNodo(contenedorPokemon);
        fetchPokemones(offset, limit);
    }
});

//Evento de boton siguiente
siguiente.addEventListener("click", () => {
    offset += 12;
    removiendoContenidoNodo(contenedorPokemon);
    fetchPokemones(offset, limit);
});

//Funcion para llamar un pokemon
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((resultado) => resultado.json())
    .then((data) => {
        creacionPokemon(data);
        spinner.style.display = "none";
    } );
}

//fetchPokemon(1);



//funcion para llamar un bloque de pokemones con offeset y limit
function fetchPokemones(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    } 
}
//fetchPokemones(12)

//funcion para crear la carta o tarjeta de pokemon
function creacionPokemon(pokemon) {

    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("bloque-pokemon");

    const contenedorImagen = document.createElement("div");
    contenedorImagen.classList.add("imagen-contenedor");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;   
    
    contenedorImagen.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(contenedorImagen);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");

    cardBack.appendChild(progressBars(pokemon.stats));



    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    contenedorPokemon.appendChild(flipCard);

}

//funcion de contenido de backcard
function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    for (let i = 0; i < 4; i++) {
      const stat = stats[i];
  
      const statPercent = stat.base_stat / 2 + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");
  
      const statName = document.createElement("p");
      statName.textContent = stat.stat.name;
  
      const progress = document.createElement("div");
      progress.classList.add("progress");
  
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.setAttribute("aria-valuenow", stat.base_stat);
      progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 150);
      progressBar.style.width = statPercent;
  
      progressBar.textContent = stat.base_stat;
  
      progress.appendChild(progressBar);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);
  
      statsContainer.appendChild(statContainer);
    }
  
    return statsContainer;
  }
  

//Funcion para remover el contenido de la pagina al llamar el boton siguiente o anterior 
function removiendoContenidoNodo(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemones(offset, limit);


