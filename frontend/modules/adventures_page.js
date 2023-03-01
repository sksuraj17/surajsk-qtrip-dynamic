import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  //parameter gives -> ?city=bengaluru(say)
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  console.log(params.get("city")); 
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  //parameter gives -> bengaluru(say)
  // TODO: MODULE_ADVENTURES
  try {
    let cityAdventures = config.backendEndpoint + "adventures?city=" + city;
    let res = await fetch(cityAdventures);
    let data = await res.json();
    console.log(data);
    return data;
  } catch {
    return null;
  }
  // 1. Fetch adventures using the Backend API and return the data
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  console.log(adventures);
  let adventure = [];
  adventure = adventures.map((ele) => {
    let rowElement = document.getElementById("data");
    let divElement = document.createElement("div");
    divElement.setAttribute("class", "col-6 col-lg-3 mb-3");
    divElement.innerHTML = `
    <a href="detail/?adventure=${ele.id}" id="${ele.id}">
      <div class="activity-card">
        <img src=${ele.image} class="card-img-top" id=${ele.name} alt= ${ele.name} />
        <div class="category-banner">${ele.category}</div>
        <div class="my-2 d-flex justify-content-between" style="width:90%">
          <p>${ele.name}</p>
          <p>₹ ${ele.costPerHead}</p>
        </div>
        <div class="mb-1 d-flex justify-content-between" style="width:90%">
        <p>Duration</p>
        <p>${ele.duration} Hours</p>
      </div>
      </div>
    </a>
  `;
    rowElement.append(divElement);
  });
  // 1. Populate the Adventure Cards and insert those details into the DOM
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  let filteredListByDuration = [];
  for(let i=0; i<list.length; i++){
    if(list[i].duration > low && list[i].duration <= high){
      filteredListByDuration.push(list[i])
    }
  }
  return filteredListByDuration;
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  let filteredListByCategory = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < categoryList.length; j++) {
      if (list[i].category == categoryList[j]) {
        filteredListByCategory.push(list[i]);
      }
    }
  }
  return filteredListByCategory;
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  let durationArray = filters.duration.split("-");
  let low = durationArray[0];
  let high = durationArray[1];

  if(filters.category.length && filters.duration.length){
    return  (list = filterByCategory(list,filters.category),
      list = filterByDuration(list, low, high)
    );
  }
  else if(filters.duration.length){
    return filterByDuration(list, low, high);
  }
  else if(filters.category.length){
    return (list = filterByCategory(list,filters.category));
  }
  else{
    return list;
  }
}
  //filterByDuration(list, filters.duration.low , filters.duration.high);
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  


//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  console.log(filters);
  return localStorage.setItem('filters',JSON.stringify(filters));
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  let data = localStorage.getItem('filters');
  return JSON.parse(data);
  //return (JSON.stringify(data));
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  let filter = [];
    filter = filters.category.map((ele) => {
      let categoryList = document.getElementById("category-list");
      let categoryFilter = document.createElement("div");
      categoryFilter.setAttribute("class", "category-filter");
      categoryFilter.textContent = ele;
      categoryList.append(categoryFilter);
    })  
  }
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
