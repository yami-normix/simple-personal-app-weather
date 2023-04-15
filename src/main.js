require('dotenv').config();

const formContainer = document.querySelector('.form-container')
const form = document.querySelector('.form')
input = document.querySelector('.input')
inputCode = document.querySelector('.input-code')
button = document.getElementById('button');
spanMessage = document.querySelector('.msg')
visualizationContainer = document.querySelector('.visualization-container')
let inputValue;
let inputCodeValue;
reload = document.querySelector('.reload')
reloadButton = document.querySelector('.reload-button')

form.addEventListener('submit', e => {
    e.preventDefault();
    inputValue = input.value;
    inputCodeValue = inputCode.value;
    callApi()

})

// Create a button to clean the html
reloadButton.addEventListener('click', e => {
    e.preventDefault();
    location.reload();
})


function callApi(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue},${inputCodeValue}&appid=${process.env.API_KEY}&units=metric`
    fetch(url)
    .then(response => response.json())
    .then(data => {
    console.log(data)

    let temperature = document.createElement('p');
    temperature.classList.add('temperature')
    temperature.textContent = data.main.temp;
    visualizationContainer.appendChild(temperature)

    let description = document.createElement('p');
    description.classList.add('description')
    description.textContent = data.weather[0].description.toUpperCase();
    
    visualizationContainer.appendChild(description)
    console.log(data.weather[0].description)


      const weather = data.weather[0];
      const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;
      const img = document.createElement('img');
      img.src = iconUrl;
      img.width = 100;
      img.height = 100;
      
      // Agregar el elemento img al elemento con id "weather-icon"
      const weatherIcon = document.getElementById('weather-icon');
      weatherIcon.appendChild(img);

  })
  .catch(() => {
    spanMessage.textContent = "Please search for a valid city 😩";
  });

  visualizationContainer.classList.add("border");
}
