<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let errorC= 0;
    let fechas = [];
    let birthData = ["Tasa de natalidad"];
    let deathData = ["Tasa de mortalidad"];
    let lifeData = ["Esperanza de vida"];
    let ages_zero_fifty = ["Muertes 0-50 años"];
    let ages_fifty_seventy = ["Muertes 50-70 años"];
    let ages_seventy = ["Muertes 70 años"];



    async function getData(){

        //Petición cargar datos

        let cargar1 = await fetch(`/api/v2/population-levels/loadInitialData`);
        let cargar2 = await fetch(`https://sos2122-24.herokuapp.com/api/v2/pneumonia-stats/loadInitialData`);

        await delay(1000);

        let res_population;
        let res_registrations;
        res_population = await fetch(`/api/v2/population-levels`);
        res_registrations = await fetch(`https://sos2122-24.herokuapp.com/api/v2/pneumonia-stats`);

        if (res_population.ok && res_registrations.ok) {
            const json = await res_population.json();
            const json_reg = await res_registrations.json();
            const country_years = [];
            for(let i = 0; i<json_reg.length;i++){
                country_years.push(json_reg[i].country+"/"+json_reg[i].year);
            }
            for(let i = 0; i<json.length; i++){
                let fecha = json[i].country+"/"+json[i].year;
                fechas.push(fecha);
                if(country_years.includes(fecha)){
                    let index = country_years.indexOf(fecha);
                    ages_zero_fifty.push(json_reg[index].ages_zero_fifty);
                    ages_fifty_seventy.push(json_reg[index].ages_fifty_seventy);
                    ages_seventy.push(json_reg[index].ages_seventy);
                    json_reg.splice(index, 1);
                }else{
                    ages_zero_fifty.push(0);
                    ages_fifty_seventy.push(0);
                    ages_seventy.push(0);
                }
                deathData.push(json[i].death_rate);
                lifeData.push(json[i].life_expectancy_birth);
                birthData.push(json[i].birth_rate);
            }
            for(let i = 0; i<json_reg.length; i++){
                fechas.push(json_reg[i].country+"/"+json_reg[i].year);
                ages_zero_fifty.push(json_reg[i].ages_zero_fifty);
                ages_fifty_seventy.push(json_reg[i].ages_fifty_seventy);
                ages_seventy.push(json_reg[i].ages_seventy);
                deathData.push(0);
                lifeData.push(0);
                birthData.push(0);
            }
            await delay(2000);
            loadGraph();
        }else{
            errorC = 200.4;
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph(){

        await delay(2000);
        var chart = bb.generate({
            bindto: "#myChart",
            axis: {
                x: {
                type: "category",
                categories: fechas
                }
            },
            data: {
                type: "spline",
                labels:true,
                columns: [
                    birthData,
                    deathData,
                    lifeData,
                    ages_zero_fifty,
                    ages_fifty_seventy,
                    ages_seventy
                ]
            },
            legend: {
                position: "right"
            }
        });
    }
    
    onMount(getData);
    
    </script>
    <svelte:head>
        <script src="https://d3js.org/d3.v6.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.js" on:load="{loadGraph}"></script>
    
    </svelte:head>
    
    <main>
        {#if errorC === 200.4}
        <br>
        <UncontrolledAlert  color="danger" >
			ERROR EN LA SOLICITUD A LOS DATOS
        </UncontrolledAlert>
        {/if}
        <br>
        <h1 align="center">Gráficas integrada de niveles de población y tasa de muertes por neumonia</h1>
        <br>
        <div id="myChart" align="center"></div>
        <br><br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>