<script>
	import Router from "svelte-spa-router";
	import Info from "./Home.svelte";
	import commonGraph from "./commonGraph.svelte";
	import videos from "./Videos.svelte";
	import integrations from "./Integrations.svelte";
	import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'sveltestrap';
	

	import ListPopulationLevels from "./population-levels/ListPopulationLevels.svelte";
	import EditPopulationEntry from "./population-levels/EditEntryPopulation.svelte";
	import GraphPopulationLevels from "./population-levels/myGraph.svelte";
	import GraphPopulationLevelsALL from "./population-levels/myGraphBillboardAll.svelte";
	import GraphPopulationLevelsBillboard from "./population-levels/myGraphBillboard.svelte";
	import GraphRegis from "./population-levels/API registration-stats.svelte";
	import GraphPneumonia from "./population-levels/API pneumonia-stats.svelte";
	import GraphBilldoardExterna1 from "./population-levels/Graph Externa 1 Billboard.svelte";
	import GraphChartExterna2 from "./population-levels/Graph Externa 2 Chart.svelte";
	import GraphChartExterna3 from "./population-levels/Graph Externa 3 Chart.svelte";
	import GraphChartExterna4 from "./population-levels/Graph Externa 4 Chart.svelte";

	import ListInternetPopulation from "./internet-population/ListInternetPopulation.svelte";
	import EditInternetPopulationEntry from "./internet-population/EditEntryInternetPopulation.svelte";
	import GraphNegatives from "./internet-population/GraphNegatives.svelte";
	import GraphCombined from "./internet-population/GraphCombined.svelte";
	import GraphExterna from "./internet-population/GraphExterna.svelte";
	import GraphExternaDos from "./internet-population/GraphExternaDos.svelte";

	import ListEnergyConsumptions from "./energy-consumptions/ListEnergyConsumptions.svelte";
	import EditEntryEnergyConsumptions from "./energy-consumptions/EditEntryEnergyConsumptions.svelte";
	import GraphFusion from "./energy-consumptions/GraphFusionChart.svelte";
	import GraphHighcharts from "./energy-consumptions/GraphHighcharts.svelte";
	import GraphCo2 from "./energy-consumptions/GraphApiCo2.svelte";
	import GraphAlphabetization from "./energy-consumptions/GraphAlphabetization.svelte";
	import GraphExterna1 from "./energy-consumptions/GraphExterna1.svelte";
	import GraphExterna2 from "./energy-consumptions/GraphExterna2.svelte";
	import GraphExterna3 from "./energy-consumptions/GraphExterna3.svelte";


	const routes = {

		"/info": Info,
		"/analytics": commonGraph,
		"/about": videos,
		"/integrations": integrations,

		"/population-levels" : ListPopulationLevels,
		"/population-levels/:country/:year" : EditPopulationEntry,
		"/population-levels_graph/:country": GraphPopulationLevels,
		"/population-levels_graph_all": GraphPopulationLevelsALL,
		"/population-levels_graph_registrations": GraphRegis,
		"/population-levels_graph_pneumonia": GraphPneumonia,
		"/population-levels_graph_billboard/:country": GraphPopulationLevelsBillboard,
		"/population-levels/Externa1" : GraphBilldoardExterna1,
		"/population-levels/Externa2" : GraphChartExterna2,
		"/population-levels/Externa3" : GraphChartExterna3,
		"/population-levels/Externa4" : GraphChartExterna4,

		"/internet-population" : ListInternetPopulation,
		"/internet-population/:codAct/:country/:year" : ListInternetPopulation,
		"/internet-population/graph/:country" : GraphNegatives,
		"/internet-population/graphC/:country" : GraphCombined,
		"/internet-population/graphExt" : GraphExterna,
		"/internet-population/graphExt2" : GraphExternaDos,
		"/internet-population/:country/:year" : EditInternetPopulationEntry,

		"/energy-consumptions" : ListEnergyConsumptions,
		"/energy-consumptions/:codAct/:country/:year" : ListEnergyConsumptions,
		"/energy-consumptions/graph/:country" : GraphFusion,
		"/energy-consumptions/higraph/:country" : GraphHighcharts,
		"/energy-consumptions/:country/:year" : EditEntryEnergyConsumptions,
		"/energy-consumptions/graphCo2" : GraphCo2,
		"/energy-consumptions/graphAlphaAlphabetization" : GraphAlphabetization,
		"/energy-consumptions/graphExterna1" : GraphExterna1,
		"/energy-consumptions/graphExterna2" : GraphExterna2,
		"/energy-consumptions/graphExterna3" : GraphExterna3,
		

	};

</script>

<main>
	<Navbar style="background-color: #6A8EF6; color:white;" light expand="lg" >
		<NavbarBrand href="#/info"><b>INICIO</b></NavbarBrand>
		<NavbarBrand href="#/about">Videos</NavbarBrand>
		<NavbarBrand href="#/integrations">Integraciones</NavbarBrand>
		<Nav navbar>
			<Dropdown >
				<DropdownToggle nav caret> API </DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./api/v2/population-levels">Niveles de población v2</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./api/v2/internet-population">Usuarios de internet v2</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./api/v2/energy-consumptions">Consumo de Energía v2</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./api/v1/population-levels">Niveles de población v1</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./api/v1/internet-population">Usuarios de internet v1</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./api/v1/energy-consumptions">Consumo de Energía v1</DropdownItem>
				</DropdownMenu>
            </Dropdown>
              
            <Dropdown>
				<DropdownToggle nav caret> FRONT-END </DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./#/population-levels">Niveles de población</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/internet-population">Usuarios de internet</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/energy-consumptions">Consumo de Energía</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			  
			<Dropdown >
				<DropdownToggle nav caret> Gráficas Niveles de población</DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./#/population-levels_graph/spain">Highcharts de España</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/population-levels_graph_billboard/spain">Billboard de España</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/population-levels_graph_all">Billboard completo</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/population-levels_graph_registrations">Integración estadísitcas de registros</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem href="./#/population-levels_graph_pneumonia">Integración estadísitcas de neumonia</DropdownItem>
				  <DropdownItem divider/>
                  <DropdownItem href="./#/population-levels/Externa1">Gráfica externa 1</DropdownItem>
				  <DropdownItem divider/>
                  <DropdownItem href="./#/population-levels/Externa2">Gráfica externa 2</DropdownItem>
				  <DropdownItem divider/>
                  <DropdownItem href="./#/population-levels/Externa3">Gráfica externa 3</DropdownItem>
				  <DropdownItem divider/>
                  <DropdownItem href="./#/population-levels/Externa4">Gráfica externa 4</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Dropdown >
				<DropdownToggle nav caret> Gráficas Usuarios de internet</DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./#/internet-population/graph/spain">Usuarios de internet de España Barras</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/internet-population/graphC/spain">Usuarios de internet de España Barras y lineas</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/internet-population/graphExt">Gráfica externa 1</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/internet-population/graphExt2">Gráfica externa 2</DropdownItem>
                  <DropdownItem divider/>
				</DropdownMenu>
			</Dropdown>
			<Dropdown >
				<DropdownToggle nav caret> Gráficas Consumo de energía</DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./#/energy-consumptions/higraph/spain">Highcharts de España</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/energy-consumptions/graph/spain">FusionChart de España</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/energy-consumptions/graphCo2">Integración API CO2</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/energy-consumptions/graphAlphaAlphabetization">Integración API Alphabetization</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./#/energy-consumptions/graphExterna1">Integración API Externa 1</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./#/energy-consumptions/graphExterna2">Integración API Externa 2</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./#/energy-consumptions/graphExterna3">Gráfica API Externa 3</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<NavbarBrand href="#/analytics"><b>GRAFICA COMÚN</b></NavbarBrand>
		</Nav>
	</Navbar>
	<Router {routes} />
</main>
