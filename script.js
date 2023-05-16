function getForecast() {
  document;
  let location = document.getElementById("location").value;

  // Make a request to OpenWeatherMap API
  let apiKey = "26e2719dcbe0b94ca1bc10094c6ea568"; // Replace with your OpenWeatherMap API key
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous forecast
      document.getElementById("forecast").innerHTML = "";

      // Process the weather forecast for the next week
      let forecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      forecast.forEach((item) => {
        let date = new Date(item.dt_txt);
        let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        let dateString = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        let temperature = Math.round(item.main.temp);
        let weatherDescription = item.weather[0].description;

        // Create a div for each day's forecast
        let dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.innerHTML = `
            <h3>${dayOfWeek}</h3>
            <p>${dateString}</p>
            <p>${temperature}°C</p>
            <p>${weatherDescription}</p>
          `;

        // Add the day's forecast to the forecast container
        document.getElementById("forecast").appendChild(dayDiv);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
