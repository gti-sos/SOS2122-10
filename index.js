const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8081;

const BASE_API_URL_ENERGY_CONSUMPTIONS = "/api/v1/energy-consumptions";
const BASE_API_URL_POPULATION_LEVELS = "/api/v1/population-levels";
const BASE_API_URL_INTERNET_POPULATION = "/api/v1/internet-population";

app.use(bodyParser.json());

//API Alejandro Molinos Eligio

var population_levels = [
    {
        country: "argentina",
        year: 2019,
        death_rate: 8,
        life_expectancy_birth: 77,
        birth_rates: 17
    },
    {
        country: "spain",
        year: 2015,
        death_rate: 9,
        life_expectancy_birth: 57,
        birth_rates: 12
    },
    {
        country: "spain",
        year: 2016,
        death_rate: 7,
        life_expectancy_birth: 62,
        birth_rates: 13
    },
    {
        country: "canada",
        year: 2016,
        death_rate: 7,
        life_expectancy_birth: 82,
        birth_rates: 11
    },
    {
        country: "brazil",
        year: 2016,
        death_rate: 6,
        life_expectancy_birth: 75,
        birth_rates: 14
    },
    {
        country: "belgium",
        year: 2019,
        death_rate: 10,
        life_expectancy_birth: 82,
        birth_rates: 10
    },
    {
        country: "australia",
        year: 2019,
        death_rate: 7,
        life_expectancy_birth: 82,
        birth_rates: 12
    }
]

//API Gabriel López Bellido

var energy_consumptions = [
    {
        country: "belgium",
        year: 2014,
        percentages_access_elecetricity: 100,
        non_renewable_energy_cosumptions: 7.709,
        renewable_energy_consumptions: 9.12
    },
    {
        country: "italy",
        year: 2005,
        percentages_access_elecetricity: 100,
        non_renewable_energy_cosumptions: 7.709,
        renewable_energy_consumptions: 6.7
    },
    {
        country: "brazil",
        year: 2014,
        percentages_access_elecetricity: 99.7,
        non_renewable_energy_cosumptions: 2.620,
        renewable_energy_consumptions: 41.83
    },
    {
        country: "belgium",
        year: 2013,
        percentages_access_elecetricity: 100,
        non_renewable_energy_cosumptions: 7.990,
        renewable_energy_consumptions: 8.09
    },
    {
        country: "brazil",
        year: 2013,
        percentages_access_elecetricity: 99.6,
        non_renewable_energy_cosumptions: 2.569,
        renewable_energy_consumptions: 42.43
    }
    ,{
        country: "croatia",
        year: 2015,
        percentages_access_elecetricity: 100,
        non_renewable_energy_cosumptions: 3.714,
        renewable_energy_consumptions: 33.62
    }
    ,{
        country: "nicaragua",
        year: 2003,
        percentages_access_elecetricity: 74.5,
        non_renewable_energy_cosumptions: 367,
        renewable_energy_consumptions: 51.74
    }
]

//API Germán Blanco Pérez-Victoria

var internet_population = [
    {
        country: "spain",
        year: 2014,
        population_growth: -0.299,
        internet_users: 76.19,
        urban_population: 79.366
    },
    {
        country: "spain",
        year: 2010,
        population_growth: 0.460,
        internet_users: 65.80,
        urban_population: 78.446
    },
    {
        country: "spain",
        year: 2008,
        population_growth: 1.595,
        internet_users: 59.60,
        urban_population: 77.976
    },
    {
        country: "germany",
        year: 2014,
        population_growth: 0.417,
        internet_users: 86.19,
        urban_population: 77.190
    },
    {
        country: "germany",
        year: 2010,
        population_growth: -0.153,
        internet_users: 82.00,
        urban_population: 76.966
    },
    {
        country: "united kingdom",
        year: 2008,
        population_growth: 0.787,
        internet_users: 78.39,
        urban_population: 80.757
    },
    {
        country: "united kingdom",
        year: 2014,
        population_growth: 0.736,
        internet_users: 91.61,
        urban_population: 82.365
    }
]

app.use("/", express.static('public'));

app.get("/cool",(req,res)=>{
    console.log("Requested / route");
    res.send("<html><body>"+cool()+"</body></html>");
});


app.listen(port, () => {
    console.log(`Servidor listo ${port}`)
});

/* 
    API para Population-levels
*/

// Cargar datos iniciales

app.get(BASE_API_URL_POPULATION_LEVELS+"/loadInitialData",(req, res)=>{

    if(population_levels.length==0){
        population_levels = [
            {
                country: "argentina",
                year: 2019,
                death_rate: 8,
                life_expectancy_birth: 77,
                birth_rates: 17
            },
            {
                country: "spain",
                year: 2015,
                death_rate: 9,
                life_expectancy_birth: 57,
                birth_rates: 12
            },
            {
                country: "spain",
                year: 2016,
                death_rate: 7,
                life_expectancy_birth: 62,
                birth_rates: 13
            },
            {
                country: "canada",
                year: 2016,
                death_rate: 7,
                life_expectancy_birth: 82,
                birth_rates: 11
            },
            {
                country: "brazil",
                year: 2016,
                death_rate: 6,
                life_expectancy_birth: 75,
                birth_rates: 14
            },
            {
                country: "belgium",
                year: 2019,
                death_rate: 10,
                life_expectancy_birth: 82,
                birth_rates: 10
            },
            {
                country: "australia",
                year: 2019,
                death_rate: 7,
                life_expectancy_birth: 82,
                birth_rates: 12
            }
        ]
    }
    res.sendStatus(200, "OK.")
    
})

// Documentos

app.get(BASE_API_URL_POPULATION_LEVELS+"/docs",(req,res)=>
{
    res.redirect("https://documenter.getpostman.com/view/20091922/UVsQrixc")
})

// GETs

// GET global y GET por año

app.get(BASE_API_URL_POPULATION_LEVELS,(req, res)=>{

    var year = req.query.year;
    var from = req.query.from;
    var to = req.query.to;
    if(year != null){
        // Apartado para búsqueda por año
        var filteredList = population_levels.filter((reg)=>
        {
            return (reg.year == year);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }else if(from != null && to != null){
        // Apartado para from y to
        var filteredList = population_levels.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else if(year == null && from == null && to == null){
        res.send(JSON.stringify(population_levels,null,2));
    }else{
        res.sendStatus(400, "BAD REQUEST");
    }
})

// GET por país

app.get(BASE_API_URL_POPULATION_LEVELS+"/:country",(req, res)=>{

    var country =req.params.country
    var filteredList = population_levels.filter((reg)=>
    {
        return (reg.country == country);
    });

    var from = req.query.from;
    var to = req.query.to;

    if(from != null && to != null){
        // Apartado para from y to
        filteredList = filteredList.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else{
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }

})

// GET por país y año

app.get(BASE_API_URL_POPULATION_LEVELS+"/:country/:year",(req, res)=>{

    var country =req.params.country
    var year = req.params.year
    var filteredList = population_levels.filter((reg)=>
    {
        return (reg.country == country && reg.year == year);
    });
    if (filteredList==0){
        res.sendStatus(404, "NO EXISTE");
    }else{
        res.send(JSON.stringify(filteredList,null,2));
    }
})

// POSTs

// POST para lista de recursos

app.post(BASE_API_URL_POPULATION_LEVELS,(req, res)=>{
    
    if(comprobar_body(req)){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        var filteredList = population_levels.filter((reg)=>
        {
            return(req.body.country == reg.country && req.body.year == reg.year)
        })
    
        if(filteredList.length != 0){
            res.sendStatus(409,"CONFLICT");
        }else{
            population_levels.push(req.body);
            res.sendStatus(201,"CREATED");
        }
    }

})

// POST para recurso concreto

app.post(BASE_API_URL_POPULATION_LEVELS+"/:country",(req, res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
})


// PUTs

// PUT de una lista de recursos

app.put(BASE_API_URL_POPULATION_LEVELS,(req, res)=>{
    
    res.sendStatus(405,"METHOD NOT ALLOWED");
})

// PUT de un recurso especifico

app.put(BASE_API_URL_POPULATION_LEVELS+"/:country/:year",(req, res)=>{
    
    if(comprobar_body(req)){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        var country = req.params.country;
        var year = req.params.year;
        var body = req.body;  
        var index = population_levels.findIndex((reg) =>{
            return (reg.country == country && reg.year == year)
        })
        if(index == null){
            res.sendStatus(404,"NOT FOUND");
        }else if(country != body.country || year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var  update_population_levels = {...body};
            population_levels[index] = update_population_levels;
        
            res.sendStatus(200,"UPDATED");
        }
    }

})

// DELETEs

// DELETE de una lista de recursos

app.delete(BASE_API_URL_POPULATION_LEVELS,(req, res)=>{
    population_levels = [];
    res.sendStatus(200,"DELETED");
})

// DELETE de un recurso especifico

app.delete(BASE_API_URL_POPULATION_LEVELS+"/:country/:year",(req, res)=>{
    var country = req.params.country;
    var year = req.params.year;
    population_levels = population_levels.filter((reg)=>{
 
        // Con la primera parte comprobamos si es un país distinto al seleccionado
        // y con la segunda en caso de ser el mismo país se comprueba si es el mismo año
        return (reg.country!=country || (reg.country == country && reg.year != year))
    })
    res.sendStatus(200,"DELETED");
})

// Método auxiliares

function comprobar_body(req){
    return (req.body.country == null |
             req.body.year == null | 
             req.body.death_rate == null | 
             req.body.life_expectancy_birth == null | 
             req.body.birth_rates == null);
}

/* 
    API para Energy-Consumptions
*/

// GET global y GET por año

app.get(BASE_API_URL_ENERGY_CONSUMPTIONS,(req, res)=>{

    var year = req.query.year;
    var from = req.query.from;
    var to = req.query.to;
    if(year != null){
        // Apartado para búsqueda por año
        var filteredList = energy_consumptions.filter((reg)=>
        {
            return (reg.year == year);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }else if(from != null && to != null){
        // Apartado para from y to
        var filteredList = energy_consumptions.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else{
        res.send(JSON.stringify(energy_consumptions,null,2));
    }
})

// GET por país

app.get(BASE_API_URL_ENERGY_CONSUMPTIONS+"/:country",(req, res)=>{

    var country =req.params.country
    var filteredList = energy_consumptions.filter((reg)=>
    {
        return (reg.country == country);
    });

    var from = req.query.from;
    var to = req.query.to;

    if(from != null && to != null){
        // Apartado para from y to
        filteredList = filteredList.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else{
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }

})

// GET por país y año

app.get(BASE_API_URL_ENERGY_CONSUMPTIONS+"/:country/:year",(req, res)=>{

    var country =req.params.country
    var year = req.params.year
    var filteredList = energy_consumptions.filter((reg)=>
    {
        return (reg.country == country && reg.year == year);
    });
    if (filteredList==0){
        res.sendStatus(404, "NO EXISTE");
    }else{
        res.send(JSON.stringify(filteredList,null,2));
    }
})

// POST

app.post(BASE_API_URL_ENERGY_CONSUMPTIONS,(req, res)=>{
    energy_consumptions.push(req.body);
    res.sendStatus(201,"CREATED");
})

/* 
    API para internet-population
*/

// GET global y GET por año

app.get(BASE_API_URL_INTERNET_POPULATION,(req, res)=>{

    var year = req.query.year;
    var from = req.query.from;
    var to = req.query.to;
    if(year != null){
        // Apartado para búsqueda por año
        var filteredList = internet_population.filter((reg)=>
        {
            return (reg.year == year);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }else if(from != null && to != null){
        // Apartado para from y to
        var filteredList = internet_population.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else{
        res.send(JSON.stringify(internet_population,null,2));
    }
})

// GET por país

app.get(BASE_API_URL_INTERNET_POPULATION+"/:country",(req, res)=>{

    var country =req.params.country
    var filteredList = internet_population.filter((reg)=>
    {
        return (reg.country == country);
    });

    var from = req.query.from;
    var to = req.query.to;

    if(from != null && to != null){
        // Apartado para from y to
        filteredList = filteredList.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else{
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }

})

// GET por país y año

app.get(BASE_API_URL_INTERNET_POPULATION+"/:country/:year",(req, res)=>{

    var country =req.params.country
    var year = req.params.year
    var filteredList = internet_population.filter((reg)=>
    {
        return (reg.country == country && reg.year == year);
    });
    if (filteredList==0){
        res.sendStatus(404, "NO EXISTE");
    }else{
        res.send(JSON.stringify(filteredList,null,2));
    }
})

// POST

app.post(BASE_API_URL_INTERNET_POPULATION,(req, res)=>{
    internet_population.push(req.body);
    res.sendStatus(201,"CREATED");
})

