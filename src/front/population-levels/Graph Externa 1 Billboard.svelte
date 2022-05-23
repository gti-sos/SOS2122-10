<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let duration = ["Duración"];
    let score = ["Puntuación"];
    let ejeX = [];

    async function getData(){

        let res = await fetch(`https://ghibliapi.herokuapp.com/films`);
        await delay(2000);
        if (res.ok) {
            let json = await res.json();
            
            for(let i = 0; i<10; i++){
                
                //Nombre
                ejeX.push(json[i].title);

                //Dato de duration
                duration.push(parseInt(json[i].running_time));
                //Dato de score
                score.push(parseInt(json[i].rt_score));
            }
            await delay(1000);
            loadGraph();
        }else{
            duration = ["Duración"];
            score = ["Puntuación"];
            ejeX = [];
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph(){
        var chart = bb.generate({
            bindto: "#barChart",
            axis: {
                x: {
                type: "category",
                categories: ejeX
                }
            },
            data: {
                type: "bar",
                labels:true,
                columns: [
                    duration,
                    score
                ]
            },
            bar: {
                width: {
                ratio: 0.5
                }
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
        <br>
        <h1 align="center">Gráfica de peliculas estudio Ghibli</h1>
        <br>
        <div id="barChart" align="center"></div>
        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>