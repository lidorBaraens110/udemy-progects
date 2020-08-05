const express = require('express');
const app = express();
const https = require('http');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    //console.log(req.body.cityName);
    var query = req.body.cityName
    var id = "60b120a47b6e07df02960183710964ba";
    var units = "metric"
    var wether = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + id + "&units=" + units;
    https.get(wether, (response) => {
        response.on("data", data => {
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var description = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write("<p> the wether is currently " + description + "</p>");
            res.write("<h1> the temperature in " + query + "is " + temp + " degree </h1>")
            res.write("<img src=" + iconUrl + ">");
            res.send();
        })
    })
})


app.listen(3000);
