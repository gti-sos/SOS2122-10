<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let errorC = 0;
    let episodes = ["Número de episodios"];
    let score = ["Puntuación"];
    let members = ["Seguidores"];
    let ejeX = [];

    async function getData(){

        let res = await fetch(`https://api.jikan.moe/v3/top/anime`);
        await delay(2000);
        if (res.ok) {
            let json = await res.json();
            json = json.top;
            
            for(let i = 0; i<10; i++){
                
                //Nombre
                ejeX.push(json[i].title);

                //Dato de episodes
                episodes.push(json[i].episodes);
                //Dato de score
                score.push(json[i].score);
                //Dato de members
                members.push(json[i].members);
            }
            await delay(1000);
            loadGraph();
        }else{
            errorC = 200.4;
            episodes = ["Número de episodios"];
            score = ["Puntuación"];
            members = ["Miembros"];
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
                    episodes,
                    members,
                    score
                ]
            },
            bar: {
                width: {
                ratio: 0.5
                }
            }
        });
        var chart = bb.generate({
            bindto: "#barChart2",
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
                    episodes,
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
        <h1 align="center">Gráfica de animes favoritos de la última semana</h1>
        <br>
        <div id="barChart" align="center"></div>
        <br>
        <h1 align="center">Gráfica sin número de seguidores</h1>
        <br>
        <div id="barChart2" align="center"></div>
        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>