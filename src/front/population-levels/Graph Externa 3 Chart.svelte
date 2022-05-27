<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let sh1 = [];
    let sh2 = [];
    let sh3 = [];
    let name1;
    let name2;
    let name3;

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
                        name1 = json[i].name;
                        sh1.push(aux[j]);
                    }else if(i==max+1){
                        name2 = json[i].name;
                        sh2.push(aux[j]);
                    }else{
                        name3 = json[i].name;
                        sh3.push(aux[j]);
                    }

                }
            }
            loadGraph();
        }else{
            sh1 = [];
            sh2 = [];
            sh3 = [];
            ejeX = [];
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph(){
        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {
            type: "radar",
            responsive: true,
            maintainAspectRatio: false,
            data: {
                labels: ejeX,
                datasets: [
                    {
                        label: name1,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        data: sh1,
                    },
                    {
                        label: name2,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(54, 162, 235)',
                        data: sh2,
                    },
                    {
                        label: name3,
                        backgroundColor: 'rgba(255, 205, 86, 0.2)',
                        borderColor: 'rgba(255, 205, 86)',
                        pointBackgroundColor: 'rgba(255, 205, 86)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 205, 86)',
                        data: sh3,
                    },
                ],
            },
            options: {
                elements: {
                line: {
                    borderWidth: 3
                }
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
        <h1 align="center">Gráfica de estadísticas de superheroes</h1>
        <br>
        <div id="chartBox" >
            <canvas id="myChart" align="center"></canvas>
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
            width: 700px;
            margin: auto;
        }
    </style>