const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8081;

const population_levels_API = require("./src/back/API population-levels.js");
const energy_consumptions_API = require("./src/back/energy-consumptions.js");
const internet_population_API = require("./src/back/internet-population.js");


const BASE_API_URL_INTERNET_POPULATION = "/api/v1/internet-population";

app.use(bodyParser.json());


// SERVER APIs

population_levels_API.register(app);
energy_consumptions_API.register(app);
internet_population_API.register(app);

app.use("/", express.static('public'));

app.get("/cool",(req,res)=>{
    console.log("Requested / route");
    res.send("<html><body>"+cool()+"</body></html>");
});


app.listen(port, () => {
    console.log(`Servidor listo ${port}`)
});

