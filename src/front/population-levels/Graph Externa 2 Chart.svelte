<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let printed = [];
    let avgPrice = [];
    let lowPrice = [];
    let ejeX = [];

    async function getData(){

        const options = {
                method: "GET",
                headers: {
                    "X-Api-Key":
                        "f16e7f03-2581-403f-8846-b413192b2176",
                },
            };

        let res = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.series:XY&orderBy=-cardmarket.prices.averageSellPrice`,options);
        await delay(2000);
        if (res.ok) {
            let json = await res.json();
            json = json.data;
            for(let i = 0; i<10; i++){
                
                //Nombre
                ejeX.push(json[i].name);

                //Dato de printed
                printed.push(json[i].set.printedTotal);
                //Dato de avgPrice
                avgPrice.push(json[i].cardmarket.prices.averageSellPrice);
                //Dato de lowPrice
                lowPrice.push(json[i].cardmarket.prices.lowPrice);
            }
            loadGraph();
        }else{
            printed = [];
            avgPrice = [];
            lowPrice = [];
            ejeX = [];
            loadGraph();
        }
    }
    
    async function loadGraph(){
        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {
            type: "line",
            responsive: true,
            maintainAspectRatio: false,
            data: {
                labels: ejeX,
                datasets: [
                    {
                        label: "Número de cartas impresas",
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        data: printed,
                    },
                    {
                        label: "Precio medio",
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(54, 162, 235)',
                        data: avgPrice,
                    },
                    {
                        label: "Precio más bajo",
                        backgroundColor: 'rgba(255, 205, 86, 0.2)',
                        borderColor: 'rgba(255, 205, 86)',
                        pointBackgroundColor: 'rgba(255, 205, 86)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 205, 86)',
                        data: lowPrice,
                    },
                ],
            }
        });

    }
    
    onMount(getData);
    
    </script>
    <svelte:head>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js" on:load={loadGraph}></script>
    
    </svelte:head>
    
    <main>
        <br>
        <h1 align="center">Gráfica de precio de cartas pokemon de la serie XY</h1>
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
            width: 1000px;
            margin: auto;
        }
    </style>