<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let printed = ["Número de cartas impresas"];
    let avgPrice = ["Precio medio"];
    let lowPrice = ["Precio más bajo"];
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
            await delay(1000);
            loadGraph();
        }else{
            errorC = 200.4;
            printed = ["Número de cartas impresas"];
            avgPrice = ["Precio medio"];
            lowPrice = ["Precio más bajo"];
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
                type: "line",
                labels:true,
                columns: [
                    printed,
                    lowPrice,
                    avgPrice
                ]
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
        <h1 align="center">Gráfica de precio de cartas pokemon de la serie XY</h1>
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