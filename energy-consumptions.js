const bodyParser = require("body-parser");

const BASE_API_URL_ENERGY_CONSUMPTIONS = "/api/v1/energy-consumptions";

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

/*
API para Energy-Consumptions
*/

//Cargar datos iniciales

module.exports.register = (app) =>{

    app.get(BASE_API_URL_ENERGY_CONSUMPTIONS+"/loadInitialData",(req, res)=>{

        if(energy_consumptions.length==0){
            energy_consumptions = [
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

        }
        res.sendStatus(200,"OK");
    })

    // Documentos

    app.get(BASE_API_URL_ENERGY_CONSUMPTIONS+"/docs",(req,res)=>
    {
        res.redirect("https://documenter.getpostman.com/view/19576654/UVsSP4EQ")
    })

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

        }else if(year == null && from == null && to == null){
            res.send(JSON.stringify(energy_consumptions,null,2));
        }else{
            res.sendStatus(400, "BAD REQUEST");
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

    // POST para lista de recursos

    app.post(BASE_API_URL_ENERGY_CONSUMPTIONS,(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var filteredList = energy_consumptions.filter((reg)=>
            {
                return(req.body.country == reg.country && req.body.year == reg.year)
            })
        
            if(filteredList.length != 0){
                res.sendStatus(409,"CONFLICT");
            }else{
                energy_consumptions.push(req.body);
                res.sendStatus(201,"CREATED");
            }
        }
    })

    // POST para recurso concreto

    app.post(BASE_API_URL_ENERGY_CONSUMPTIONS+"/:country",(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })

    // PUT de una lista de recursos

    app.put(BASE_API_URL_ENERGY_CONSUMPTIONS,(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })

    app.put(BASE_API_URL_ENERGY_CONSUMPTIONS+"/:country/:year",(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var country = req.params.country;
            var year = req.params.year;
            var body = req.body;  
            var index = energy_consumptions.findIndex((reg) =>{
                return (reg.country == country && reg.year == year)
            })
            if(index == null){
                res.sendStatus(404,"NOT FOUND");
            }else if(country != body.country || year != body.year){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                var  update_energy_consumptions = {...body};
                energy_consumptions[index] = update_energy_consumptions;
            
                res.sendStatus(200,"UPDATED");
            }
        }

    })

    // DELETE de una lista de recursos

    app.delete(BASE_API_URL_ENERGY_CONSUMPTIONS,(req, res)=>{
        energy_consumptions = [];
        res.sendStatus(200,"DELETED");
    })

    // DELETE de un recurso especifico

    app.delete(BASE_API_URL_ENERGY_CONSUMPTIONS+"/:country/:year",(req, res)=>{
        var country = req.params.country;
        var year = req.params.year;
        energy_consumptions = energy_consumptions.filter((reg)=>{
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
                req.body.percentages_access_elecetricity == null | 
                req.body.non_renewable_energy_cosumptions == null | 
                req.body.renewable_energy_consumptions == null);
    }
}