const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8081;

const population_levels_API = require("./src/back/API population-levels.js");
const energy_consumptions_API = require("./src/back/energy-consumptions.js");
const internet_population_API = require("./src/back/internet-population.js");
const Datastore = require('nedb');

//BASE DE DATOS

db_population_levels = new Datastore();
db_internet_population = new Datastore();

app.use(bodyParser.json());


// SERVER APIs

population_levels_API.register(app,db_population_levels);
energy_consumptions_API.register(app);
internet_population_API.register(app, db_internet_population);

app.use("/", express.static('public'));

app.get("/cool",(req,res)=>{
    console.log("Requested / route");
    res.send("<html><body>"+cool()+"</body></html>");
});


app.listen(port, () => {
    console.log(`Servidor listo ${port}`)
});

