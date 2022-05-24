<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let errorC = null;
    
    //Pais
    let country = "spain";

    //Fechas
    let fechas = [];
    let fechas_population = [];
    let fechas_energy = [];
    let fechas_internet = [];

    //Datos population levels

    let birthData = [];
    let deathData = [];
    let lifeData = [];

   //Datos internet population

    let growthData = [];
    let usersData = [];
    let urbanData = [];

    //Datos energy consumptions

    let percentData = [];
    let nonRenewableData = [];
    let renewableData = [];

    async function getData(){

        let res_population;
        let res_energy;
        let res_internet;
        await fetch(`/api/v2/population-levels/loadInitialData`);
        await fetch(`/api/v2/energy-consumptions/loadInitialData`);
        await fetch(`/api/v2/internet-population/loadInitialData`);


        res_population = await fetch(`/api/v2/population-levels`);
        res_energy = await fetch(`/api/v2/energy-consumptions`);
        res_internet = await fetch(`/api/v2/internet-population`);
        
        if (res_population.ok && res_energy.ok && res_internet.ok) {
            const json_population = await res_population.json();
            const json_energy = await res_energy.json();
            const json_internet = await res_internet.json();
            for(let i=0;i<json_population.length;i++){
                fechas_population.push(json_population[i].country+"/"+json_population[i].year);
            }
            for(let i=0;i<json_energy.length;i++){
                fechas_energy.push(json_energy[i].country+"/"+json_energy[i].year);
            }
            for(let i=0;i<json_internet.length;i++){
                fechas_internet.push(json_internet[i].country+"/"+json_internet[i].year);
            }
            guardaDatosPopulation(json_population,json_energy,json_internet);
            guardaDatosInternet(json_population,json_energy,json_internet);
            guardaDatosEnergy(json_population,json_energy,json_internet);

            console.log(fechas);
            await delay(3000);
            loadGraph();
        }else{
            errorC = 404;
            birthData = [];
            deathData = [];
            lifeData = [];
            growthData = [];
            usersData = [];
            urbanData = [];
            percentData = [];
            nonRenewableData = [];
            renewableData = [];
            await delay(1000);
            loadGraph();
        }
    }
    
    async function guardaDatosPopulation(json_population,json_energy,json_internet){
        for(let i = 0; i<json_population.length; i++){
                let fecha = json_population[i].country+"/"+json_population[i].year;
                fechas.push(fecha);
                if(fechas_energy.includes(fecha)){
                    let index = fechas_energy.indexOf(fecha);
                    percentData.push(json_energy[index].percentages_access_elecetricity);
                    nonRenewableData.push(json_energy[index].non_renewable_energy_consumptions);
                    renewableData.push(json_energy[index].renewable_energy_consumptions);
                    json_energy.splice(index, 1);
                }else{
                    percentData.push(0);
                    nonRenewableData.push(0);
                    renewableData.push(0);
                }
                if(fechas_internet.includes(fecha)){
                    let index = fechas_internet.indexOf(fecha);
                    growthData.push(json_internet[index].population_growth);
                    usersData.push(json_internet[index].internet_users);
                    urbanData.push(json_internet[index].urban_population);
                    json_internet.splice(index, 1);
                }else{
                    growthData.push(0);
                    usersData.push(0);
                    urbanData.push(0);
                }
                deathData.push(json_population[i].death_rate);
                lifeData.push(json_population[i].life_expectancy_birth);
                birthData.push(json_population[i].birth_rate);
            
            }

    }

    async function guardaDatosEnergy(json_population,json_energy,json_internet){
        for(let i = 0; i<json_energy.length; i++){
                let fecha = json_energy[i].country+"/"+json_energy[i].year;
                fechas.push(fecha);
                if(fechas_population.includes(fecha)){
                    let index = fechas_population.indexOf(fecha);
                    deathData.push(json_population[i].death_rate);
                    lifeData.push(json_population[i].life_expectancy_birth);
                    birthData.push(json_population[i].birth_rate);
                    json_population.splice(index, 1);
                }else{
                    deathData.push(0);
                    lifeData.push(0);
                    birthData.push(0);
                }
                if(fechas_internet.includes(fecha)){
                    let index = country_years.indexOf(fecha);
                    growthData.push(json_internet[index].population_growth);
                    usersData.push(json_internet[index].internet_users);
                    urbanData.push(json_internet[index].urban_population);
                    json_internet.splice(index, 1);
                }else{
                    growthData.push(0);
                    usersData.push(0);
                    urbanData.push(0);
                }
                percentData.push(json_energy[i].percentages_access_elecetricity);
                nonRenewableData.push(json_energy[i].non_renewable_energy_consumptions);
                renewableData.push(json_energy[i].renewable_energy_consumptions);
                
            
            }
    }

    async function guardaDatosInternet(json_population,json_energy,json_internet){
        for(let i = 0; i<json_internet.length; i++){
                let fecha = json_internet[i].country+"/"+json_internet[i].year;
                fechas.push(fecha);
                if(fechas_population.includes(fecha)){
                    let index = fechas_population.indexOf(fecha);
                    deathData.push(json_population[i].death_rate);
                    lifeData.push(json_population[i].life_expectancy_birth);
                    birthData.push(json_population[i].birth_rate);
                    json_population.splice(index, 1);
                }else{
                    deathData.push(0);
                    lifeData.push(0);
                    birthData.push(0);
                }
                if(fechas_energy.includes(fecha)){
                    let index = fechas_energy.indexOf(fecha);
                    percentData.push(json_energy[index].percentages_access_elecetricity);
                    nonRenewableData.push(json_energy[index].non_renewable_energy_consumptions);
                    renewableData.push(json_energy[index].renewable_energy_consumptions);
                    json_energy.splice(index, 1);
                }else{
                    percentData.push(0);
                    nonRenewableData.push(0);
                    renewableData.push(0);
                }
                growthData.push(json_internet[i].population_growth);
                usersData.push(json_internet[i].internet_users);
                urbanData.push(json_internet[i].urban_population);
                
            
            }
            
    }

    async function loadGraph(){
        
        Highcharts.chart('container', {
        
            chart: {
                type: 'column'
            },
            title: {
                text: `Gráfico común a todo el grupo`
            },
        
            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
        
            xAxis: {
                categories: fechas,
                accessibility: {
                    title: {
                    text: 'Año'
                }
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                //Population levels
                {
                    name: 'Tasa de mortalidad',
                    data: deathData
                },
                {
                    name: 'Tasa de natalidad',
                    data: birthData
                },
                {
                    name: 'Esperanza de vida',
                    data: lifeData
                },
                // Internet population
                {
                    name: 'Crecimiento de población',
                    data: growthData
                },
                {
                    name: 'Usuarios de internet',
                    data: usersData
                },
                {
                    name: 'Población urbana',
                    data: urbanData
                },
                
                // Energy consumptions
                {
                    name: 'Acceso a la electricidad',
                    data: percentData
                },
                {
                    name: 'Energía No Renovable Consumida',
                    data: nonRenewableData
                },
                {
                    name: 'Energía Renovable Consumida',
                    data: renewableData
                },
            ]
        
        });
    }
    
    onMount(getData);
    
    </script>
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/series-label.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    
    </svelte:head>
    
    <main>

        {#if errorC === 404}
        <UncontrolledAlert  color="danger" >
            El país introducido no tiene registros para alguna de las APIS.
        </UncontrolledAlert>
        {/if}

        <br>
        <figure class="highcharts-figure">
            <div id="container"></div>
        </figure>
        <br>
        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>