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
    let level1 = ["Nivel Primario"];
    let level2 = ["Nivel Secundario"];
    let level3 = ["Nivel Terciario"];



    async function getData(){

        //Petición cargar datos

        let cargar1 = await fetch(`/api/v2/population-levels/loadInitialData`);
        let cargar2 = await fetch(`/remoteApiRegistration/loadInitialData`);

        await delay(1000);

        let res_population;
        let res_registrations;
        res_population = await fetch(`/api/v2/population-levels`);
        res_registrations = await fetch(`/remoteApiRegistration`);

        if (res_population.ok && res_registrations.ok) {
            const json = await res_population.json();
            const json_reg = await res_registrations.json();
            let rangoMax = 5;
            const country_years = [];
            for(let i = 0; i<json_reg.length;i++){
                country_years.push(json_reg[i].country+"/"+json_reg[i].year);
            }
            for(let i = 0; i<json.length; i++){

                let fecha = json[i].country+"/"+json[i].year;
                fechas.push(fecha);
                if(country_years.includes(fecha)){
                    let index = country_years.indexOf(fecha);
                    level1.push(json_reg[index].primarylevel);
                    level2.push(json_reg[index].secondarylevel);
                    level3.push(json_reg[index].tertiarylevel);
                    json_reg.splice(index, 1);
                }else{
                    level1.push(0);
                    level2.push(0);
                    level3.push(0);
                }
                deathData.push(json[i].death_rate);
                lifeData.push(json[i].life_expectancy_birth);
                birthData.push(json[i].birth_rate);
            }
            for(let i = 0; i<json_reg.length; i++){
                fechas.push(json_reg[i].country+"/"+json_reg[i].year);
                level1.push(json_reg[i].primarylevel);
                level2.push(json_reg[i].secondarylevel);
                level3.push(json_reg[i].tertiarylevel);
                deathData.push(0);
                lifeData.push(0);
                birthData.push(0);
            }
            loadGraph();
        }else{
            errorC = 200.4;
            loadGraph();
        }
    }
    
    async function loadGraph(){

        var chart = bb.generate({
            bindto: "#myChart",
            axis: {
                x: {
                type: "category",
                categories: fechas
                }
            },
            data: {
                type: "step",
                labels:true,
                columns: [
                    birthData,
                    deathData,
                    lifeData,
                    level1,
                    level2,
                    level3
                ]
            },
            bar: {
                width: {
                ratio: 0.5
                }
            },
            legend: {
                position: "right"
            }
        });

        
    }
    
    onMount(getData);
    
    </script>
    <svelte:head>
        <link rel="stylesheet" href="./circular-dependencies/billboard.js/dist/billboard.css">
        <script src="./circular-dependencies/billboard.js/dist/billboard.pkgd.js"></script>
    
    </svelte:head>
    
    <main>
        {#if errorC === 200.4}
        <br>
        <UncontrolledAlert  color="danger" >
			ERROR EN LA SOLICITUD A LOS DATOS
        </UncontrolledAlert>
        {/if}
        <br>
        <h1 align="center">Gráficas integrada de niveles de población y estadísitcas de registros</h1>
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