/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const container = document.querySelector('.container');
const result = document.querySelector('#result');
const form = document.querySelector('#form');

// window.addEventListener('load', () => {
//   form.addEventListener('submit', searchWeather);
// })
document.getElementById('generate').addEventListener('click', searchWeather);

function searchWeather(e) {
  e.preventDefault();

  // Valid 
  const zip = document.querySelector('#zip').value;
  const emotion = document.querySelector('#feelings').value;
  
  // console.log(zip);
  // console.log(emotion);
  if (zip === '' || emotion === '') {
    showError('Complete the required fields');
    return;
  }
  //Weather
  consultApi(zip);
}

function showError(menssage) {
  console.log(menssage)
  // created alert
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `
   <strong>Error!</strong>
   <span>${menssage}</span>
   `;

  container.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);

}

/* Function to GET Web API Data*/
function consultApi(zip) {

  const appId = 'e395421c2b5a4bfb7485a9e331756b01';
  const UrlBase = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${appId}`;

  // console.log(UrlBase);

  fetch(UrlBase)
    .then(Response => Response.json())
    .then(data => {
      clearHTML();

      if (data.cod === "404") {
        showError('zipCode not find')
        return;
      }
      // weather
      displayWeather(data);
    })
}
/* Function to POST data */
function displayWeather(data) {
  const feel = document.querySelector('#feelings').value;
  const { main: { temp, temp_max, temp_min } } = data;
  // console.log(temp);
 
  const ActualTemp = temp;
  const max = temp_max;
  const min = temp_min;

  const emotion = document.createElement('p');
  emotion.innerHTML = `Feelings: ${feel}`;
  emotion.classList.add('tempp');

  const actual = document.createElement('p');
  actual.innerHTML = `Current Temperature: ${ActualTemp} &#8457;`;
  actual.classList.add('tempp');

  const tempMax = document.createElement('p');
  tempMax.innerHTML = `Highest Temperature: ${max} &#8457;`;
  tempMax.classList.add('tempp');

  const tempMin = document.createElement('p');
  tempMin.innerHTML = `Lowest Temperature: ${min} &#8457;`;
  tempMin.classList.add('tempp');


  const resultDiv = document.createElement('div');
  resultDiv.classList.add('text-center', 'text-white');
  resultDiv.appendChild(actual);
  resultDiv.appendChild(tempMax);
  resultDiv.appendChild(tempMin);
  resultDiv.appendChild(emotion);

  result.appendChild(resultDiv);
}

function clearHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}