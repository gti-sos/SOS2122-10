<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import ListPopulationLevels from "./population-levels/ListPopulationLevels.svelte";
	import EditPopulationEntry from "./population-levels/EditEntryPopulation.svelte";

	const routes = {

		"/": Home,
		"/population-levels" : ListPopulationLevels,
		"/population-levels/:country/:year" : EditPopulationEntry

	};

</script>

<main>
	<Router {routes} />
</main>
