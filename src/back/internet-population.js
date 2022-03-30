const bodyParser = require("body-parser");

const BASE_API_URL_INTERNET_POPULATION = "/api/v1/internet-population";

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
    
/* 
    API para internet-population
*/
module.exports.register = (app,db) =>{
    
    // Cargar datos iniciales
    
    app.get(BASE_API_URL_INTERNET_POPULATION+"/loadInitialData",(req, res)=>{
    
        db.find({},function(err, filteredList){

            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }
            if (filteredList==0){
                for(var i = 0; i<internet_population.length;i++){
                    db.insert(internet_population[i]);
                }
                res.sendStatus(200, "OK.")
                return;
            }
        });
        
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

        //Comprobamos query

        for(var i = 0; i<Object.keys(req.query).length;i++){
            var element = Object.keys(req.query)[i];
            if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }

        //Comprobamos si from es mas pequeño o igual a to
        if(from>to){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({},function(err, filteredList){

            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            // Apartado para búsqueda por año
            
            if(year != null){
                var filteredList = filteredList.filter((reg)=>
                {
                    return (reg.year == year);
                });
                if (filteredList==0){
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }
            }
    
            // Apartado para from y to
            
            if(from != null && to != null){
                filteredList = filteredList.filter((reg)=>
                {
                    return (reg.year >= from && reg.year <=to);
                });
    
                if (filteredList==0){
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }    
            }
            // RESULTADO
    
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredList = paginacion(req,filteredList);
            }
            filteredList.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(filteredList,null,2));
        })
    })
    
    // GET por país
    
    app.get(BASE_API_URL_INTERNET_POPULATION+"/:country",(req, res)=>{
    
        var year = req.query.year;
        var from = req.query.from;
        var to = req.query.to;

        //Comprobamos query

        for(var i = 0; i<Object.keys(req.query).length;i++){
            var element = Object.keys(req.query)[i];
            if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }

        //Comprobamos si from es mas pequeño o igual a to
        if(from>to){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({},function(err, filteredList){

            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            // Apartado para búsqueda por año
            
            if(year != null){
                var filteredList = filteredList.filter((reg)=>
                {
                    return (reg.year == year);
                });
                if (filteredList==0){
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }
            }
    
            // Apartado para from y to
            
            if(from != null && to != null){
                filteredList = filteredList.filter((reg)=>
                {
                    return (reg.year >= from && reg.year <=to);
                });
    
                if (filteredList==0){
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }    

                
            }
            // RESULTADO
    
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredList = paginacion(req,filteredList);
            }
            filteredList.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(filteredList,null,2));
        })
    })
    
    // GET por país y año
    
    app.get(BASE_API_URL_INTERNET_POPULATION+"/:country/:year",(req, res)=>{
    
        var country =req.params.country
        var year = req.params.year

        db.find({},function(err, filteredList){

            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            filteredList = filteredList.filter((reg)=>
            {
                return (reg.country == country && reg.year == year);
            });
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }
    
            //RESULTADO
    
            //Paginación
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredList = paginacion(req,filteredList);
                res.send(JSON.stringify(filteredList,null,2));
            }
            filteredList.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(filteredList[0],null,2));
        });
    })
    
    //POSTs
    
    // POST para lista de recursos
    
    app.post(BASE_API_URL_INTERNET_POPULATION,(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{

            db.find({},function(err,filteredList){

                if(err){
                    res.sendStatus(500, "ERROR EN CLIENTE");
                    return;
                }

                filteredList = filteredList.filter((reg)=>
                {
                    return(req.body.country == reg.country && req.body.year == reg.year)
                })
            
                if(filteredList.length != 0){
                    res.sendStatus(409,"CONFLICT");
                }else{
                    db.insert(req.body);
                    res.sendStatus(201,"CREATED");
                }
            })
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
        
        //COMPROBAMOS FORMATO JSON

        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
            return;
        }
        
        var countryR = req.params.country;
        var yearR = req.params.year;
        var body = req.body;  

        db.find({},function(err,filteredList){
            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            //COMPROBAMOS SI EXISTE EL ELEMENTO

            filteredList = filteredList.filter((reg)=>
            {
                return (reg.country == countryR && reg.year == yearR);
            });
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }

            //COMPROBAMOS SI LOS CAMPOS ACTUALIZADOS SON IGUALES

            if(countryR != body.country || yearR != body.year){
                res.sendStatus(400,"BAD REQUEST");
                return;
            }

            //ACTUALIZAMOS VALOR
                
            db.update({country: countryR, year: yearR }, {$set: body}, {},function(err, updatedDb) {
                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                }else{
                    res.sendStatus(200,"UPDATED");
                }
            });
        })
    
    })
    
    // DELETEs
    
    // DELETE de una lista de recursos
    
    app.delete(BASE_API_URL_INTERNET_POPULATION,(req, res)=>{
        db.remove({}, { multi: true }, (err, numRemoved)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            res.sendStatus(200,"DELETED");
            return;
        });
    })
    
    // DELETE de un recurso especifico
    
    app.delete(BASE_API_URL_INTERNET_POPULATION+"/:country/:year",(req, res)=>{
        var countryR = req.params.country;
        var yearR = req.params.year;

        db.find({country: countryR, year: parseInt(yearR)}, {}, (err, filteredList)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            if(filteredList==0){
                res.sendStatus(404,"NOT FOUND");
                return;
            }
            db.remove({country: countryR, year: yearR}, {}, (err, numRemoved)=>{
                if (err){
                    res.sendStatus(500,"ERROR EN CLIENTE");
                    return;
                }
                res.sendStatus(200,"DELETED");
                return;
                
            });
        });
    })
    
    // Método auxiliares
    
    function comprobar_body(req){
        return (req.body.country == null |
                 req.body.year == null | 
                 req.body.population_growth == null | 
                 req.body.internet_users == null | 
                 req.body.urban_population == null);
    }

    function paginacion(req, lista){

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;
        
        if(limit < 1 || offset < 0 || offset > lista.length){
            res.push("ERROR EN PARAMETROS LIMIT Y/O OFFSET");
            return res;
        }

        res = lista.slice(offset,parseInt(limit)+parseInt(offset));
        return res;

    }
}