<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let episodes = [];
    let score = [];
    let members = [];
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
            episodes = [];
            score = [];
            members = [];
            ejeX = [];
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph(){
        
        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ejeX,
                datasets: [
                    {
                        label: "Número de episodios",
                        borderColor: "rgba(255, 99, 132, 0.2)",
                        backgroundColor: "rgba(255, 99, 132, 1)",
                        data: episodes,
                    },
                    {
                        label: "Puntuación",
                        backgroundColor: "#bc98f3",
                        borderColor: "#bc98f3",
                        data: score,
                    },
                    {
                        label: "Miembros",
                        backgroundColor: "#bdecb6",
                        borderColor: "#bdecb6",
                        data: members,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            },
        });

        var ctx2 = document.getElementById("myChart2").getContext("2d");
        var chart2 = new Chart(ctx2, {
            type: "bar",
            data: {
                labels: ejeX,
                datasets: [
                    {
                        label: "Número de episodios",
                        borderColor: "rgba(255, 99, 132, 0.2)",
                        backgroundColor: "rgba(255, 99, 132, 1)",
                        data: episodes,
                    },
                    {
                        label: "Puntuación",
                        backgroundColor: "#bc98f3",
                        borderColor: "#bc98f3",
                        data: score,
                    }
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            },
        });

    }
    
    onMount(getData);
    
    </script>
    <svelte:head>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js" on:load={loadGraph}></script>
    
    </svelte:head>
    
    <main>
        <br>
        <h1 align="center">Gráfica de animes favoritos de la última semana</h1>
        <br>
        <div id="chartBox" >
            <canvas id="myChart" align="center"></canvas>
        </div>
        <br>
        <h1 align="center">Gráfica de animes favoritos de la última semana(SIN MIEMBROS)</h1>
        <br>
        <div id="chartBox" >
            <canvas id="myChart2" align="center"></canvas>
        </div>
        <br>

        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>
    <style>
        #chartBox{
            width: 1000px;
            margin: auto;
        }
    </style>