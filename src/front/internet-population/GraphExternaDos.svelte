<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let Data = [];

    async function getData(){

        let res = await fetch("/remoteExt2");
        await delay(2000);
        var services = 0;
        var supplies = 0;
        var constructions = 0;
        var other = 0;
        if(res.ok){
            let json = await res.json();
            for (let i=0; i<20;i++){
                var p = parseInt(json.data[i].awarded[0].value);
                
                if(json.data[i].category == "services"){
                    services += p;
                }
                else if(json.data[i].category == "supplies"){
                    supplies += p;
                }
                else if(json.data[i].category == "constructions"){
                    constructions += p;
                }
                else {
                    other += p;
                }   
            }
            var total= services + supplies + constructions + other;
            Data.push({  y: (services/total)*100, label: "servicios" });
            Data.push({  y: (supplies/total)*100, label: "suministros" });
            Data.push({  y: (constructions/total)*100, label: "construcciones" });
            Data.push({  y: (other/total)*100, label: "otros" });
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