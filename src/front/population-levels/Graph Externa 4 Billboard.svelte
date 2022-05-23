<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let sh1 = [];
    let sh2 = [];
    let sh3 = [];

    let ejeX = ["Inteligencia","Fuerza","Velocidad","Durabilidad","Combate"];

    async function getData(){

        let res = await fetch(`https://akabab.github.io/superhero-api/api/all.json`);
        await delay(2000);
        if (res.ok) {
            let json = await res.json();

            let aux = [];
            let max = 494
            for(let i = max; i<max+3; i++){
                
                aux = []
                //Nombre
                aux.push(json[i].name);

                //Dato de inteligencia
                aux.push(json[i].powerstats.intelligence);
                //Dato de fuerza
                aux.push(json[i].powerstats.strength);
                //Dato de velocidad
                aux.push(json[i].powerstats.speed);
                //Dato de durabilidad
                aux.push(json[i].powerstats.durability);
                //Dato de combate
                aux.push(json[i].powerstats.combat);

                for(let j = 0; j<aux.length;j++){
                    if(i==max){
                        sh1.push(aux[j]);
                    }else if(i==max+1){
                        sh2.push(aux[j]);
                    }else{
                        sh3.push(aux[j]);
                    }

                }
            }
            await delay(1000);
            loadGraph();
        }else{
            errorC = 200.4;
            sh1 = [];
            sh2 = [];
            sh3 = [];
            ejeX = [];
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph(){
        var chart = bb.generate({
            bindto: "#radarChart",
            axis: {
                x: {
                type: "category",
                categories: ejeX
                }
            },
            data: {
                type: "radar",
                labels:true,
                columns: [
                    sh1,
                    sh2,
                    sh3
                ]
            },
            radar: {
                level: {
                depth: 4
                },
                direction: {
                clockwise: true
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
        <h1 align="center">Gráfica de estadísticas de superheroes</h1>
        <br>
        <div id="radarChart" align="center"></div>
        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>