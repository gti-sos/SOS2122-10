<script>

    import {onMount} from 'svelte';
    export let params = {};
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let birthData = [];
    let deathData = [];
    let lifeData = [];
    let country = params.country;

    async function getData(){

        let res;

        if(country==null){
            res = await fetch(`/api/v2/population-levels`);
        }else{
            res = await fetch(`/api/v2/population-levels/${country}`);
        }
        if (res.ok) {
            const json = await res.json();
            for(let i = 0; i<json.length; i++){
                let aux = [];
                aux.push(json[i].year);
                aux.push(json[i].death_rate);
                deathData.push(aux);

                aux = [];
                aux.push(json[i].year);
                aux.push(json[i].life_expectancy_birth);
                lifeData.push(aux);
                
                aux = [];
                aux.push(json[i].year);
                aux.push(json[i].birth_rate);
                birthData.push(aux);
            }
            console.log(json);
            if(country==null){
                birthData = [];
                deathData = [];
                lifeData = [];
            }
            country = null;
            await delay(1000);
            loadGraph();
        }else{
            window.alert('El país introducido no tiene registros');
            birthData = [];
            deathData = [];
            lifeData = [];
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph(){
        
        Highcharts.chart('container', {
        
            title: {
                text: `Tasa de natalidad y mortalidad en ${params.country} por cada 1000 personas`
            },
        
            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
        
            xAxis: {
                accessibility: {
                    title: {
                    text: 'Año'
                }
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
        
            series: [{
                type: 'area',
                name: 'Tasa de mortalidad',
                data: deathData
            },
            {
                type: 'area',
                name: 'Tasa de natalidad',
                data: birthData
            }]
        
        });

        Highcharts.chart('container2', {
        
            title: {
                text: `Esperanza de vida media al nacer en  ${params.country}`
            },
        
            yAxis: {
                title: {
                    text: 'Edad'
                }
            },
        
            xAxis: {
                accessibility: {
                    title: {
                    text: 'Año'
                }
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    }
                }
            },
        
            series: [
            {
                type: 'area',
                name: 'Life expectancy',
                data: lifeData
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
    }
    
    onMount(getData);
    
    </script>
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/series-label.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    
    </svelte:head>
    
    <main>
        <br>
        <h1 align="center">Gráficas de {params.country}</h1>
        <div align="center">
            <input type="text" bind:value="{country}">
            <Button outline color="info" on:click="{()=>{
                window.location.href = `/#/population-levels_graph/${country}`;
                location.reload();
                
            }}">
            Buscar
            </Button>
        </div>
        <br>
        <figure class="highcharts-figure">
            <div id="container"></div>
        </figure>
        <br><br>
        <figure class="highcharts-figure">
            <div id="container2"></div>
        </figure>
        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>