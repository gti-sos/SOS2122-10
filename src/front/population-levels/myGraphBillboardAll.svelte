<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let birthData = ["Tasa de natalidad"];
    let deathData = ["Tasa de mortalidad"];
    let lifeData = ["Esperanza de vida"];
    let ejeX = [];

    async function getData(){

        let res = await fetch(`/api/v2/population-levels`);

        if (res.ok) {
            const json = await res.json();
            for(let i = 0; i<json.length; i++){
                
                ejeX.push(json[i].country+"/"+json[i].year);

                //Dato de tasa de mortalidad
                deathData.push(json[i].death_rate);

                //Dato de esperanza de vida
                lifeData.push(json[i].life_expectancy_birth);
                
                //Dato de tasa de natalidad
                birthData.push(json[i].birth_rate);
            }
            await delay(1000);
            loadGraph();
        }else{
            birthData = [];
            deathData = [];
            lifeData = [];
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph(){
        var chart = bb.generate({
            bindto: "#myChart",
            data: {
                labels:true,
                columns: [
                    birthData,
                    deathData,
                    lifeData
                ],
                type: "line"
            },
            axis: {
                x: {
                type: "category",
                categories: ejeX
                }
  },
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
        <br>
        <h1 align="center">Gráficas de niveles de población</h1>
        <br>
        <div id="myChart" align="center"></div>
        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>