<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";

	import ListPopulationLevels from "./population-levels/ListPopulationLevels.svelte";
	import EditPopulationEntry from "./population-levels/EditEntryPopulation.svelte";

	import ListInternetPopulation from "./internet-population/ListInternetPopulation.svelte";
	import EditInternetPopulationEntry from "./internet-population/EditEntryInternetPopulation.svelte";

	import ListPopulationEnergyConsumptions from "./energy-consumptions/ListPopulationEnergyConsumptions.svelte";
	import EditEntryEnergyConsumptions from "./energy-consumptions/EditEntryEnergyConsumptions.svelte";


	const routes = {

		"/": Home,

		"/population-levels" : ListPopulationLevels,
		"/population-levels/:country/:year" : EditPopulationEntry,

		"/internet-population" : ListInternetPopulation,
		"/internet-population/:country/:year" : EditInternetPopulationEntry,

		"/energy-consumptions" : ListPopulationEnergyConsumptions,
		"/penergy-consumptions/:country/:year" : EditEntryEnergyConsumptions

	};

</script>

<main>
	<Router {routes} />
</main>
