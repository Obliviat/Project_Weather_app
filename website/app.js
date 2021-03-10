// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// // /* Global Variables */

const container = document.querySelector('.container');
const zip = document.querySelector('#zip').value;
const appId = 'e395421c2b5a4bfb7485a9e331756b01&units=imperial';
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;

// const result = document.querySelector('#result');
// const form = document.querySelector('#form');

window.addEventListener('load', () => {
  form.addEventListener('submit', Valid);
})

// document.getElementById('generate').addEventListener('click', development);

function Valid(e) {
  e.preventDefault();
  console.log("Search");
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
  development(e);
}

function showError(menssage) {
  console.log(menssage)
  // created alert
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `
   <strong>Alert!</strong>
   <span>${menssage}</span>
   `;
  container.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);

}

function development(e) {
  e.preventDefault();
  const newZipCode = document.querySelector('#zip').value;
  const content = document.querySelector('#feelings').value;
  searchWeather(baseURL, newZipCode, appId)
    .then(function (data) {
      console.log(data);
      postData('/addData', { date: d, temp: data.main.temp, weather: data.weather, content: content });

    }).then(function () {
      updateUI();
    })
};

// Get request
const searchWeather = async (baseURL, zip, appId) => {
  const res = await fetch(baseURL + zip + "&appid=" + appId)
  try {
    // Transform into JSON
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("error", e);
  }
}
// Post
const postData = async (url = '', data = {}) => {
  console.log(data);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (e) {
    console.log('error', e);
  }
}

//update UI
const updateUI = async () => {
  const request = await fetch('/all')
  try {
    const allData = await request.json()
    console.log(allData, Data);
    document.getElementById('date').innerHTML = "Date: " + allData.date;
    document.getElementById('temp').innerHTML = "temp: " + allData.temperature;
    document.getElementById('content').innerHTML = "Feelings: " + allData.content;
  } catch (e) {
    console.log("error", e);
  }
}

