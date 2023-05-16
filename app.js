const searchForm = document.querySelector("#userForm");
const APIKEY = "98d95409e3907625aa0eadd05b3e926d";
const getDataURL = "https://api.openweathermap.org/data/2.5/forecast?q=";

const handleSearch = (event) => {
  event.preventDefault();

  const userSearchBox = document.querySelector("#userSearch");

  const userSearch = userSearchBox.value;

  if (!userSearch) {
  } else {
    getSearchResults(userSearch);
  }
};

const getWeatherInfo = async (userinput) => {
  const searchURL = `${getDataURL}${userinput}&units=metric&appid=${APIKEY}`;
  const response = await fetch(searchURL);
  const data = await response.json();
  return data;
};

//This is code to select the api stuff

// const displayWeather = (info) => {
//   const city = info.city.name;
//   const cityCode = info.city.country;
//   const sunrise = info.city.sun.rise;
//   const sunset = info.city.sun.set;
//   const temperature = info.temperature.value;
//   const cloudsName = info.clouds.name;
//   const cloudsValue = info.clouds.value;

//   const newDiv = document.createElement("div");
//   newDiv.innerHTML = `
//   <h1>${city}${cityCode}</h1>
//   <p>${temperature}</p>
//   <p>${sunrise}${sunset}</p>
//   <p>${cloudsName}${cloudsValue}</p>
//   `;

//   newDiv.setAttribute("class", "weatherContainer");

//   appDiv.append(newDiv);
// };

const getSearchResults = async (userinput) => {
  const longLat = await getWeatherInfo(userinput);
  console.log(longLat);
};

userForm.addEventListener("submit", handleSearch);
