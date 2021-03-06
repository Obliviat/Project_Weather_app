// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
  console.log('server running');
  console.log(`running on http://localhost:${port}`);
}

//Create JS object  / Endpoint
// const projectData = {}

// Get Route that uses the url /all
app.get('/all', sendData);
function sendData(req, res) {
  console.log(req);
  res.send(projectData);
};


// POST method route
app.post('/addData', (req, res) => {
  const newEntry = {
    date: req.body.date,
    temperature: req.body.temp,
    weather: req.body.weather,
    content: req.body.content,
  };
  Object.assign(projectData, newEntry);
});

