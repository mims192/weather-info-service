import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const apiKey = process.env.API;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set EJS as the template engine

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    const city = req.body.city;
    console.log(city);
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weatherData = response.data;    //this is the way we tap into the response that came from api

        res.render("index.ejs", { weatherData });
    } catch (error) {
        console.error("Error fetching weather:", error);
        let errorMessage = "Error fetching weather data. Please try again later.";
        if (error.response && error.response.status === 404) {
            errorMessage = "City not found. Please enter a valid city name.";
        }
        res.render("index.ejs", { error: errorMessage });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




//import express from 'express';
//import request from 'request';

//const app = express();

//app.get('/', (req, res) => {
    //const city = req.query.city;
   // request(
       // `https://samples.openweathermap.org/data/2.5/forecast?q=${city}&appid=replace-this-with-your-api-key`,
        //(error, response, body) => {                        callback function
           // const data = JSON.parse(body);               pasing the body (resonse ) recieved by api into js obj
          //  if (response.statusCode === 200) {
          //      res.send(`The weather in your city "${city}" is ${data.list[0].weather[0].description}`);
         //   }
       // }
   // );
//});

//app.listen(3000, () => console.log('Server started on port 3000'));


//Callback Function: This function is executed when the response is received from the API. It takes three parameters: 
//error, response, and body. Inside the callback function:
//error: This parameter holds any error that occurred during the request, such as a network error.
//response: This parameter contains information about the HTTP response, including the status code (statusCode).
//body: This parameter holds the body of the HTTP response, which is typically in JSON format.
//Parsing JSON: The JSON.parse() function is used to parse the JSON-formatted body into a JavaScript object (data).
//Response Handling: If the status code of the HTTP response is 200 (OK), it sends a response back to the client using res.send(). The response contains a string 
//indicating the weather description for the city obtained from the data object.