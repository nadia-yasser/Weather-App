// *********GET DATE*********
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = new Date();
const date1 = month.getDate() + " " + months[month.getMonth()];

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var day = new Date();
let weekDay1 = weekDays[day.getDay()];

// *********DISPLAY FUNCTION*********
function display(finalData) {
  // Get Next Dates
  const date2 =
    new Date(finalData.forecast.forecastday[1].date).getDate() +
    " " +
    months[new Date(finalData.forecast.forecastday[1].date).getMonth()];
  const date3 =
    new Date(finalData.forecast.forecastday[2].date).getDate() +
    " " +
    months[new Date(finalData.forecast.forecastday[2].date).getMonth()];
  const weekDay2 =
    weekDays[new Date(finalData.forecast.forecastday[1].date).getDay()];
  const weekDay3 =
    weekDays[new Date(finalData.forecast.forecastday[2].date).getDay()];
  

  let todayForcast = `<div class="card-header bg-transparent border-bottom-0 d-flex justify-content-between fs-4 text-white p-4">
        <div class="location">
          <i class="fa-solid fa-location-dot text-warning"></i>
          <span class="city fw-bold text-capitalize">${finalData.location.name}</span>
        </div>
        <div class="date">${date1}</div>
      </div>

      <div class="card-body text-white text-center p-4">
        <div class="day text-start text-uppercase fs-5 fw-semibold">${weekDay1}</div>
        <div class="icon">
          <img src="${finalData.current.condition.icon}" class="w-25">
        </div>
        <div class="degree">
          <span class="num">${finalData.current.temp_c}</span>
          <sup>o</sup>
          <span>C</span>
        </div>
        <div class="cond fs-5">${finalData.current.condition.text}</div>
      </div>
      <div class="card-footer bg-transparent border-0 d-flex justify-content-between p-4 text-white-50">
        <div class="deg fs-5">
          <i class="fa-solid fa-umbrella fa-rotate-by text-muted"></i>
          <span>${finalData.current.cloud}</span> %
        </div>
        <div class="speed fs-5">
          <i class="fa-solid fa-wind text-muted"></i>
          <span>${finalData.current.wind_kph}</span> km/h
        </div>
        <div class="dir fs-5">
          <i class="fa-regular fa-compass text-muted"></i>
          <span>${finalData.current.wind_dir}<span>
        </div>
      </div>`;
  document.querySelector(".today-weather").innerHTML = todayForcast;

  let secondDay = `<div class="card-header bg-transparent border-0  text-white p-4 text-center text-capitalize ">
              <div class="date d-flex justify-content-between align-items-center">
                <div class="day fs-5 fw-semibold">
                  ${weekDay2}
                </div>
                <div class="month fs-6">
                  ${date2}
                </div>
              </div>
            </div>
            <div class="card-body text-success text-center text-white">
              <div class="icon">
                <img src="${finalData.forecast.forecastday[1].day.condition.icon}" class="w-25">
              </div>
              <div class="my-2">
                <span class="cond fs-5 text-capitalize">${finalData.forecast.forecastday[1].day.condition.text}</span>
              </div>
              <div class="max-degree fs-1 fw-semibold">
                <span class="num">${finalData.forecast.forecastday[1].day.maxtemp_c}</span>
                <sup>o</sup>
                <span>C</span>
              </div>
              <div class="min-degree fs-4 text-white-50">
                <span class="num">${finalData.forecast.forecastday[1].day.mintemp_c}</span>
                <sup>o</sup>
                <span>C</span>
              </div>
            </div>`;
  document.querySelector(".second-day").innerHTML = secondDay;

  let thirdDay = `<div class="card-header bg-transparent border-0  text-white p-4 text-center text-capitalize ">
              <div class="date d-flex justify-content-between align-items-center">
                <div class="day fs-5 fw-semibold">
                  ${weekDay3}
                </div>
                <div class="month fs-6">
                  ${date3}
                </div>
              </div>
            </div>
            <div class="card-body text-success text-center text-white">
              <div class="icon">
                <img src="${finalData.forecast.forecastday[2].day.condition.icon}" class="w-25">
              </div>
              <div class="my-2">
                <span class="cond fs-5 text-capitalize ms-3">${finalData.forecast.forecastday[2].day.condition.text}</span>
              </div>
              <div class="max-degree fs-1 fw-semibold">
                <span class="num">${finalData.forecast.forecastday[2].day.maxtemp_c}</span>
                <sup>o</sup>
                <span>C</span>
              </div>
              <div class="min-degree fs-4 text-white-50">
                <span class="num">${finalData.forecast.forecastday[2].day.mintemp_c}</span>
                <sup>o</sup>
                <span>C</span>
              </div>
            </div>`;
  document.querySelector(".third-day").innerHTML = thirdDay;
}

// *********GET WEATHER FUNCTION*********
async function getWeather(c) {
  let reqData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7c785214ae834d51b54153720242506&q=${c}&days=3`
  );
  let finalData = await reqData.json();
  display(finalData);
  return finalData;
}

// *********SEARCH  FUNCTION*********
let searchInput = document.querySelector(".input");
searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value;
  console.log(searchValue);
  getWeather(this.value);
});

// *********GET LOCATION FUNCTION*********
function getLocation(){
  navigator.geolocation.getCurrentPosition(async function (location) {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    let reqLoc = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7c785214ae834d51b54153720242506&q=${lat},${long}&days=3`
    );
    let finalData = await reqLoc.json();
    display(finalData);
  });
}
getLocation();
