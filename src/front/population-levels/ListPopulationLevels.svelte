<script>

    import { onMount } from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte';

	//Aquí se guardan todas las entradas de nuestra api

    let entries = [];

	//Variables para la utilización de la busqueda por fecha, paginación y limites

	let from = null;
	let to = null;
	let offset = 0;
	let limit = 10;

	//Límite máximo de páginas

	let maxPages = 99;

	let newEntry = {
		country: "",
		year: "",
		death_rate: "",
        life_expectancy_birth: "",
        birth_rate: ""
	}

	//Al cargar la página llamamos a getEntries que devuelve todas las entradas

    onMount(getEntries);

    async function getEntries(){
        console.log("Fetching entries....");
		let cadena = `/api/v1/population-levels?limit=${limit}&&offset=${offset*10}&&`;
		if (from != null) {
			cadena = cadena + `from=${from}&&`
		}
		if (to != null) {
			cadena = cadena + `to=${to}&&`
		}
        const res = await fetch(cadena); 
        if(res.ok){
			maxPagesFunction();
            const data = await res.json();
            entries = data;
            console.log("Received entries: "+entries.length);
        }else{
			Errores(res.status);
		}
    }

	//Función para añadir una entrada

	async function insertEntry(){
        console.log("Inserting entry...."+JSON.stringify(newEntry));
        const res = await fetch("/api/v1/population-levels",
			{
				method: "POST",
				body: JSON.stringify(newEntry),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res){
				getEntries();
				window.alert("Entrada introducida con éxito");
			}); 
    }

	//Función para borrar una entrada

	async function BorrarEntry(countryDelete, yearDelete){
        console.log("Deleting entry....");
        const res = await fetch("/api/v1/population-levels/"+countryDelete+"/"+yearDelete,
			{
				method: "DELETE"
			}).then(function (res){
				getEntries();
				window.alert("Entrada eliminada con éxito");
			});
    }

	//Función para borrar todas las entradas

	async function BorrarEntries(){
        console.log("Deleting entries....");
        const res = await fetch("/api/v1/population-levels/",
			{
				method: "DELETE"
			}).then(function (res){
				getEntries();
				window.alert("Entradas elimidas con éxito");
			});
    }

	//Función para cargar las entradas

	async function LoadEntries(){
        console.log("Loading entries....");
        const res = await fetch("/api/v1/population-levels/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getEntries();
				window.alert("Entradas cargadas con éxito");
			});
    }

	//Función auxiliar para imprimir errores

	async function Errores(code){
        
        let msg;
        if(code == 400){
            msg = "La fecha inicio no puede ser menor a la fecha fin"
        }
        window.alert(msg)
            return;
    }
	
	//Función auxiliar para obtener el número máximo de páginas que se pueden ver

	async function maxPagesFunction(){
        const res = await fetch("/api/v1/population-levels",
			{
				method: "GET"
			});
			if(res.ok){
				const data = await res.json();
				maxPages = Math.floor(data.length/10);
				if(maxPages === data.length/10){
					maxPages = maxPages-1;
				}
        }
	}

</script>

<main>
   
    <h1>Lista Niveles de Población</h1>

{#await entries}
loading
	{:then entries}
	
	<Table bordered>
		<thead>
			<tr>
				<th>Fecha inicio</th>
				<th>Fecha fin</th>
				<th>Página</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input type="number" min="0" bind:value="{from}"></td>
				<td><input type="number" min="0" bind:value="{to}"></td>
				<td><input type="number" min="0" max="{maxPages}" bind:value="{offset}"></td>
				<td><Button outline color="primary" on:click="{getEntries}">
					Buscar
					</Button>
				</td>
			</tr>
		</tbody>
	</Table>

	<Table bordered>
		<thead>
			<tr>
				<th>País</th>
				<th>Año</th>
				<th>Tasa de mortalidad</th>
				<th>Esperanza de vida</th>
                <th>Tasa de natalidad</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newEntry.country}"></td>
				<td><input type="number" bind:value="{newEntry.year}"></td>
				<td><input type="number" bind:value="{newEntry.death_rate}"></td>
                <td><input type="number" bind:value="{newEntry.life_expectancy_birth}"></td>
                <td><input type="number" bind:value="{newEntry.birth_rate}"></td>
				<td><Button outline color="primary" on:click="{insertEntry}">
					Añadir
					</Button>
				</td>
			</tr>
			{#each entries as entry}
				<tr>
					<td>{entry.country}</td>
					<td>{entry.year}</td>
					<td>{entry.death_rate}</td>
                    <td>{entry.life_expectancy_birth}</td>
                    <td>{entry.birth_rate}</td>
					<td><Button outline color="warning" on:click={function (){
						window.location.href = `/#/population-levels/${entry.country}/${entry.year}`
					}}>
						Editar
					</Button>
					<td><Button outline color="danger" on:click={BorrarEntry(entry.country,entry.year)}>
						Borrar
					</Button>
					</td>
				</tr>
			{/each}
			<tr>
				<td><Button outline color="success" on:click={LoadEntries}>
					Cargar datos
				</Button></td>
				<td><Button outline color="danger" on:click={BorrarEntries}>
					Borrar todo
				</Button></td>
			</tr>
		</tbody>
	</Table>
	<br>
	<br>
{/await}

</main>