const bodyParser = require("body-parser");

const BASE_API_URL_INTERNET_POPULATION = "/api/v1/internet-population";

//API Germán Blanco Pérez-Victoria

module.exports.register = (app) =>{
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
    
    /* 
        API para internet-population
    */
    
    // Cargar datos iniciales
    
    app.get(BASE_API_URL_INTERNET_POPULATION+"/loadInitialData",(req, res)=>{
    
        if(internet_population.length==0){
            internet_population = [
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
                }
            ]
        }
        res.sendStatus(200, "OK.")
        
    })
    
    // Documentos
    
    app.get(BASE_API_URL_INTERNET_POPULATION+"/docs",(req,res)=>
    {
        res.redirect("https://documenter.getpostman.com/view/19899210/UVsSLi1g")
    })
    
    //GETs
    
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
    
    //POSTs
    
    // POST para lista de recursos
    
    app.post(BASE_API_URL_INTERNET_POPULATION,(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var filteredList = internet_population.filter((reg)=>
            {
                return(req.body.country == reg.country && req.body.year == reg.year)
            })
        
            if(filteredList.length != 0){
                res.sendStatus(409,"CONFLICT");
            }else{
                internet_population.push(req.body);
                res.sendStatus(201,"CREATED");
            }
        }
    
    })
    
    // POST para recurso concreto
    
    app.post(BASE_API_URL_INTERNET_POPULATION+"/:country",(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })
    
    
    // PUTs
    
    // PUT de una lista de recursos
    
    app.put(BASE_API_URL_INTERNET_POPULATION,(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })
    
    // PUT de un recurso especifico
    
    app.put(BASE_API_URL_INTERNET_POPULATION+"/:country/:year",(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var country = req.params.country;
            var year = req.params.year;
            var body = req.body;  
            var index = internet_population.findIndex((reg) =>{
                return (reg.country == country && reg.year == year)
            })
            if(index == null){
                res.sendStatus(404,"NOT FOUND");
            }else if(country != body.country || year != body.year){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                var  update_internet_population = {...body};
                internet_population[index] = update_internet_population;
            
                res.sendStatus(200,"UPDATED");
            }
        }
    
    })
    
    // DELETEs
    
    // DELETE de una lista de recursos
    
    app.delete(BASE_API_URL_INTERNET_POPULATION,(req, res)=>{
        internet_population = [];
        res.sendStatus(200,"DELETED");
    })
    
    // DELETE de un recurso especifico
    
    app.delete(BASE_API_URL_INTERNET_POPULATION+"/:country/:year",(req, res)=>{
        var country = req.params.country;
        var year = req.params.year;
        internet_population = internet_population.filter((reg)=>{
     
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
                 req.body.population_growth == null | 
                 req.body.internet_users == null | 
                 req.body.urban_population == null);
    }
}