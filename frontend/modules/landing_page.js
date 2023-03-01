import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  console.log(config.backendEndpoint+ "cities");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  let cardsArray = [];
  cardsArray = cities.map((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  return cardsArray;
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let cityURL = config.backendEndpoint + "cities";
  try {
    let res = await fetch(cityURL);
    let data = await res.json();
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let rowElement = document.getElementById("data"); //rowElement
  let divElement = document.createElement("div");  //divElement
  divElement.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-4")
  divElement.innerHTML = `
    <a href= "pages/adventures/?city=${id}" id=${id}>
      <div class="tile">
        <img src= ${image} />
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  `;
  rowElement.append(divElement);
}

export { init, fetchCities, addCityToDOM };
