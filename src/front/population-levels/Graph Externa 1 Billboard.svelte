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

        <link rel="stylesheet" href="./circular-dependencies/billboard.js/dist/billboard.css">
        <script src="./circular-dependencies/billboard.js/dist/billboard.pkgd.js"></script>
    
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