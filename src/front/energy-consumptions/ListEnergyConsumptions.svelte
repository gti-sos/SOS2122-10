<script>

    import { onMount } from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte';

    let entries = [];

	let newEntry = {
		country: "",
		year: "",
		percentages_access_elecetricity: "",
        non_renewable_energy_consumptions: "",
        renewable_energy_consumptions: ""
	}

    onMount(getEntries);

    async function getEntries(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/energy-consumptions"); 
        if(res.ok){
            const data = await res.json();
            entries = data;
            console.log("Received entries: "+entries.length);
        }
    }

	async function insertEntry(){
        console.log("Inserting entry...."+JSON.stringify(newEntry));
        const res = await fetch("/api/v1/energy-consumptions",
			{
				method: "POST",
				body: JSON.stringify(newEntry),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res){
				if(res.status == 201){
					getEntries();
					window.alert("Entrada introducida con éxito");
				}else{
					Errores(res.status);
				}
			}); 
    }

	async function BorrarEntry(countryDelete, yearDelete){
        console.log("Deleting entry....");
        const res = await fetch("/api/v1/energy-consumptions/"+countryDelete+"/"+yearDelete,
			{
				method: "DELETE"
			}).then(function (res){
				getEntries();
				window.alert("Entrada eliminada con éxito");
			});
    }

	async function BorrarEntries(){
        console.log("Deleting entries....");
        const res = await fetch("/api/v1/energy-consumptions/",
			{
				method: "DELETE"
			}).then(function (res){
				getEntries();
				window.alert("Entradas elimidas con éxito");
			});
    }

	async function LoadEntries(){
        console.log("Loading entries....");
        const res = await fetch("/api/v1/energy-consumptions/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getEntries();
				window.alert("Entradas cargadas con éxito");
			});
    }

	async function Errores(code){
        
        let msg;
        if(code == 404){
            msg = "La entrada seleccionada no existe"
        }
        if(code == 400){
            msg = "La petición no está correctamente formulada"
        }
        if(code == 409){
            msg = "El dato introducido ya existe"
        }
        if(code == 401){
            msg = "No autorizado"
        }
        if(code == 405){
            msg = "Método no permitido"
        }
        window.alert(msg)
            return;
    }

	

</script>

<main>
   
    <h1>Consumo de Energía Renovable y no Renovable</h1>

{#await entries}
loading
	{:then entries}
	

	<Table bordered>
		<thead>
			<tr>
				<th>País</th>
                <th>Año</th>
                <th>Acceso a la electricidad</th>
                <th>Energía No Renovable Consumida</th>
                <th>Energía Renovable Consumida</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newEntry.country}"></td>
				<td><input bind:value="{newEntry.year}"></td>
				<td><input bind:value="{newEntry.percentages_access_elecetricity}"></td>
                <td><input bind:value="{newEntry.non_renewable_energy_consumptions}"></td>
                <td><input bind:value="{newEntry.renewable_energy_consumptions}"></td>
				<td><Button outline color="primary" on:click="{insertEntry}">
					Añadir
					</Button>
				</td>
			</tr>
			{#each entries as entry}
				<tr>
					<td>{entry.country}</td>
					<td>{entry.year}</td>
					<td>{entry.percentages_access_elecetricity}</td>
                    <td>{entry.non_renewable_energy_consumptions}</td>
                    <td>{entry.renewable_energy_consumptions}</td>
					<td><Button outline color="warning" on:click={function (){
						window.location.href = `/#/energy-consumptions/${entry.country}/${entry.year}`
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
{/await}

</main>