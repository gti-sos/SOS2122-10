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
    , {
        country: "croatia",
        year: 2015,
        percentages_access_elecetricity: 100,
        non_renewable_energy_cosumptions: 3.714,
        renewable_energy_consumptions: 33.62
    }
    , {
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

module.exports.register = (app, db) => {

    app.get(BASE_API_URL_ENERGY_CONSUMPTIONS + "/loadInitialData", (req, res) => {

        db.find({}, function (err, filteredList) {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }
            if (filteredList == 0) {
                for (var i = 0; i < energy_consumptions.length; i++) {
                    db.insert(energy_consumptions[i]);
                }
                res.sendStatus(200, "OK.")
                return;
            }else{
            res.sendStatus(200, "Ya inicializados")
        }
        });
    })

    // Documentos

    app.get(BASE_API_URL_ENERGY_CONSUMPTIONS + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/19576654/UVyswasj")
    })

    // GET global y GET por año

    app.get(BASE_API_URL_ENERGY_CONSUMPTIONS, (req, res) => {

        var year = req.query.year;
        var from = req.query.from;
        var to = req.query.to;

        //Comprobamos query

        for (var i = 0; i < Object.keys(req.query).length; i++) {
            var element = Object.keys(req.query)[i];
            if (element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset") {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }

        //Comprobamos si from es mas pequeño o igual a to

        if (from > to) {
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({}, function (err, filteredList) {

            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }


            // Apartado para búsqueda por año

            if (year != null) {
                var filteredList = filteredList.filter((reg) => {
                    return (reg.year == year);
                });
                if (filteredList == 0) {
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }
            }

            // Apartado para from y to

            if (from != null && to != null) {
                filteredList = filteredList.filter((reg) => {
                    return (reg.year >= from && reg.year <= to);
                });

                if (filteredList == 0) {
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }
            }

            // Resultado sin ID

            if (req.query.limit != undefined || req.query.offset != undefined) {
                filteredList = paginacion(req, filteredList);
            }
            filteredList.forEach((element) => {
                delete element._id;
            });
            res.send(JSON.stringify(filteredList, null, 2));
        })
    })

    // GET por país

    app.get(BASE_API_URL_ENERGY_CONSUMPTIONS + "/:country", (req, res) => {

        var country = req.params.country
        var from = req.query.from;
        var to = req.query.to;

        //Comprobamos query

        for (var i = 0; i < Object.keys(req.query).length; i++) {
            var element = Object.keys(req.query)[i];
            if (element != "from" && element != "to") {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }

        //Comprobamos si from es mas pequeño o igual a to
        if (from > to) {
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({}, function (err, filteredList) {

            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            filteredList = filteredList.filter((reg) => {
                return (reg.country == country);
            });

            // Apartado para from y to
            var from = req.query.from;
            var to = req.query.to;

            //Comprobamos si from es mas pequeño o igual a to
            if (from > to) {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }

            if (from != null && to != null && from <= to) {
                filteredList = filteredList.filter((reg) => {
                    return (reg.year >= from && reg.year <= to);
                });

            }
            //COMPROBAMOS SI EXISTE
            if (filteredList == 0) {
                res.sendStatus(404, "NO EXISTE");
                return;
            }
            //RESULTADO

            //Paginación
            if (req.query.limit != undefined || req.query.offset != undefined) {
                filteredList = paginacion(req, filteredList);
            }
            filteredList.forEach((element) => {
                delete element._id;
            });
            res.send(JSON.stringify(filteredList, null, 2));
        })

    })

    // GET por país y año

    app.get(BASE_API_URL_ENERGY_CONSUMPTIONS + "/:country/:year", (req, res) => {

        var country = req.params.country
        var year = req.params.year

        db.find({}, function (err, filteredList) {

            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            filteredList = filteredList.filter((reg) => {
                return (reg.country == country && reg.year == year);
            });
            if (filteredList == 0) {
                res.sendStatus(404, "NO EXISTE");
                return;
            }

            //RESULTADO

            //Paginación
            if (req.query.limit != undefined || req.query.offset != undefined) {
                filteredList = paginacion(req, filteredList);
                res.send(JSON.stringify(filteredList, null, 2));
            }
            filteredList.forEach((element) => {
                delete element._id;
            });
            res.send(JSON.stringify(filteredList[0], null, 2));
        });
    })

    // POST para lista de recursos

    app.post(BASE_API_URL_ENERGY_CONSUMPTIONS, (req, res) => {

        if (comprobar_body(req)) {
            res.sendStatus(400, "BAD REQUEST - Parametros incorrectos");
        } else {
            db.find({}, function (err, filteredList) {

                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                    return;
                }

                filteredList = filteredList.filter((reg) => {
                    return (req.body.country == reg.country && req.body.year == reg.year)
                })

                if (filteredList.length != 0) {
                    res.sendStatus(409, "CONFLICT");
                } else {
                    db.insert(req.body);
                    res.sendStatus(201, "CREATED");
                }
            })
        }
    })

    // POST para recurso concreto

    app.post(BASE_API_URL_ENERGY_CONSUMPTIONS + "/:country", (req, res) => {
        res.sendStatus(405, "METHOD NOT ALLOWED");
    })

    // PUT de una lista de recursos

    app.put(BASE_API_URL_ENERGY_CONSUMPTIONS, (req, res) => {
        res.sendStatus(405, "METHOD NOT ALLOWED");
    })

    // PUT de un recurso especifico

    app.put(BASE_API_URL_ENERGY_CONSUMPTIONS + "/:country/:year", (req, res) => {

        //Comprobamos Formato JSON

        if (comprobar_body(req)) {
            res.sendStatus(400, "BAD REQUEST - Parametros incorrectos");
            return;
        }
        var countryR = req.params.country;
        var yearR = req.params.year;
        var body = req.body;

        db.find({}, function (err, filteredList) {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            //COMPROBAMOS SI EXISTE EL ELEMENTO

            filteredList = filteredList.filter((reg) => {
                return (reg.country == countryR && reg.year == yearR);
            });
            if (filteredList == 0) {
                res.sendStatus(404, "NO EXISTE");
                return;
            }

            //COMPROBAMOS SI LOS CAMPOS ACTUALIZADOS SON IGUALES

            if (countryR != body.country || yearR != body.year) {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }

            //ACTUALIZAMOS VALOR

            db.update({$and:[{country: String(countryR)}, {year: parseInt(yearR)}]}, {$set: body}, {},function(err, numUpdated) {
                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                }else{
                    res.sendStatus(200,"UPDATED");
                }
            });
        })
    })

    // DELETE de una lista de recursos

    app.delete(BASE_API_URL_ENERGY_CONSUMPTIONS,(req, res)=>{
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

    app.delete(BASE_API_URL_ENERGY_CONSUMPTIONS+"/:country/:year",(req, res)=>{
        var country = req.params.country;
        var year = req.params.year;

        db.find({country: country, year: parseInt(year)}, {}, (err, filteredList)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            if(filteredList==0){
                res.sendStatus(404,"NOT FOUND");
                return;
            }
            db.remove({country: country, year: year}, {}, (err, numRemoved)=>{
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

    function comprobar_body(req) {
        return (req.body.country == null |
            req.body.year == null |
            req.body.percentages_access_elecetricity == null |
            req.body.non_renewable_energy_cosumptions == null |
            req.body.renewable_energy_consumptions == null);
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