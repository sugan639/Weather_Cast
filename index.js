const express=require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { Http2ServerRequest } = require("http2");
const app = express()
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/index.html");
})

app.post("/",function(req,res){
   const city = req.body.cityname;

    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&appid=2e5b561989339c6e8933887a17c99d90"

    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
           const temp = weatherData.weather[0].description;
          console.log(temp);
        })
    }) 
   
    
     res.send("The temperature is" +temp );
    
})

app.listen(3000,function(){
    console.log("Server is listening");
})

