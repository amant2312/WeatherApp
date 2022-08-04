const response = require("express");
const express =require("express");
const bodyParser=require("body-parser");
const https = require("https");

const app=express();

app.use(bodyParser.urlencoded({express: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const userCity=req.body.cityName;
    console.log(userCity);
    console.log("Post Request Recieved");
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&appid=f4bdcba3c334de6b895d59d6cd00e7f2"
    


    https.get(url, function(response){
        console.log(response.statusCode);
    

        response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherDiscription = "Currently it is seeming to be "+weatherData.weather[0].description;
        const weatherIcon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
        res.write("<h1>Current temperature of "+userCity +" is "+temp+".</h1>")
        res.write("<h3>"+weatherDiscription+"</h3>")

        res.write("<img src="+weatherIcon+">");
        res.send();
        });
    });
        
});










// app.get("/", function(req,res){

//     const url= "https://api.openweathermap.org/data/2.5/weather?q=London&appid=f4bdcba3c334de6b895d59d6cd00e7f2"
    


//     https.get(url, function(response){
//         console.log(response.statusCode);
    

//     response.on("data", function(data){
//         const weatherData = JSON.parse(data)
//         const temp=weatherData.main.temp
//         const weatherDiscription = "Currently it is seeming to be "+weatherData.weather[0].description;
//         const weatherIcon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
//         res.write("<h1>Current temperature is "+temp+".</h1>")
//         res.write("<h3>"+weatherDiscription+"</h3>")

//         res.write("<img src="+weatherIcon+">");
//         res.send();
        

//     })
//     //http://openweathermap.org/img/wn/10d@2x.png

//     // https.get("http://openweathermap.org/img/wn/10d@2x.png", function(res2){
//     //     res.write(res2);
//     // })


//     })

// })





app.listen(3000, function(){console.log("Server is listening at port 3000")});