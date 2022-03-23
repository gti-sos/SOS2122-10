const bodyParser = require("body-parser");

const BASE_API_URL_POPULATION_LEVELS = "/api/v1/population-levels";

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

module.exports.register = (app) =>{
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
}
