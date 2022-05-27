<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let Data = [];

    async function getData(){

        let res = await fetch("/remoteExt2");
        await delay(2000);
        if(res.ok){
            let json = await res.json();
            for (let i=0; i<20;i++){
                var p = parseInt(json.data[i].awarded[0].value);
                Data.push({  y: p, label: json.data[i].category });
                
            }
            console.log(Data);
            loadGraph();
        } else {
            Data = [];
            loadGraph();
        }
    }

async function loadGraph(){
    var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: "Comparativa de compras realizadas en España"
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##0.00\"%\"",
		indexLabel: "{label} {y}",
		dataPoints: Data
	}]
});
chart.render();
}

onMount(getData);

</script>
<svelte:head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<main>
    <br>
        <h1 align="center">Gráfica de compras</h1>
        <br>
        <div id="chartContainer" style="height: 370px; width: 100%;"></div>
        <br><br>

        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
</main>