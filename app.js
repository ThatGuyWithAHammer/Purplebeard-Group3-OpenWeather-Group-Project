const searchForm = document.querySelector("#userForm");
const APIKEY = "98d95409e3907625aa0eadd05b3e926d";
const getDataURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const promptUser = document.querySelector("#promptUser");
const generalInformation = document.querySelector("#genInfo");
const weatherInformation = document.querySelector("#tempInfo");

const handleSearch = (event) => {
  event.preventDefault();

  const userSearchBox = document.querySelector("#userSearch");

  const userSearch = userSearchBox.value;

  if (!userSearch) {
    promptUser.classList.remove("hidden");
  } else {
    promptUser.classList.add("hidden");
    getSearchResults(userSearch);
  }
};

const getWeatherInfo = async (userinput) => {
  const searchURL = `${getDataURL}${userinput}&units=metric&appid=${APIKEY}`;
  const response = await fetch(searchURL);
  const data = await response.json();
  return data;
};

const sortThroughDates = (object) => {
  const smallForecast = [];
  const resultsArray = object.list;
  for (i = 0; i < resultsArray.length; i++) {
    let findTime = resultsArray[i].dt_txt;
    let checkTime = findTime.slice(11, 19);
    if (
      checkTime == "06:00:00" ||
      checkTime == "12:00:00" ||
      checkTime == "18:00:00"
    ) {
      smallForecast.push(resultsArray[i]);
    }
  }
  return smallForecast;
};

const convertUnix = (unix) => {
  let convertToMiliseconds = new Date(unix * 1000);

  let unixHr = "0" + convertToMiliseconds.getHours();
  let unixMin = "0" + convertToMiliseconds.getMinutes();
  let unixSec = "0" + convertToMiliseconds.getSeconds();
  let realDate =
    unixHr.slice(-2) + ":" + unixMin.slice(-2) + ":" + unixSec.slice(-2);

  return realDate;
};

const makeGeneralInfo = (object) => {
  const city = object.name;
  const cityCode = object.country;
  const sunrise = convertUnix(object.sunrise);
  const sunset = convertUnix(object.sunset);

  const newDiv1 = document.createElement("div1");
  newDiv1.innerHTML = `
  <h1>${city}${cityCode}</h1>
  <p>Sunrise: ${sunrise} Sunset: ${sunset}</p>`;
  newDiv1.setAttribute("class", "generalInformation");

  generalInformation.append(newDiv1);
};

const displayWeather = (object) => {
  for (let i = 0; i < object.length; i++) {
    const temperature = Math.round(object[i].main.temp);
    console.log(object[i].weather);
    const weatherType = object[i].weather[0].main;
    const weatherDescription = object[i].weather[0].description;
    const weatherIcon = object[i].weather[0].icon;
    const newDiv2 = document.createElement("div2");
    newDiv2.innerHTML = `
    <p>${temperature}c</p>
    <p>${weatherType}</p>
    <p>${weatherDescription}</p>
    <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="picture of weather"></img>
    `;
    newDiv2.setAttribute("class", "weatherContainer");

    weatherInformation.append(newDiv2);
  }
};

const getSearchResults = async (userinput) => {
  const longLat = await getWeatherInfo(userinput);
  makeGeneralInfo(longLat.city);
  const filterData = sortThroughDates(longLat);
  displayWeather(filterData);
};

userForm.addEventListener("submit", handleSearch);
//Hello//
