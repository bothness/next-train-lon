<script>
  // @ts-nocheck
  import "../../app.css";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  export let data;

  let destination;
</script>

<svelte:head>
  <title>Rob's next train to London</title>
</svelte:head>

<div class="selector">
  <label>
    Destination
    <select bind:value={destination} on:change={() => goto(`${base}/${destination}`)}>
      <option value="out">London Waterloo</option>
      <option value="rtn">Southampton Airport Parkway</option>
    </select>
  </label>
</div>
<div class="container" style:width="{data.trainServices.length * 400 + (data.trainServices.length - 1) * 3}px">
  {#each data.trainServices as train, i}
  <div class="train" class:first={i === 0} class:cancelled={train.etd === "Cancelled"} class:noplatform={!train.platform && train.etd !== "Cancelled"}>
    <div class="header">
      <div class="text-lg flex">
        <span>{train.std}</span>
        {#if train.etd === "Cancelled"}
        <span class="yellow">Cancelled</span>
        {:else if train.etd !== "On time"}
        <span>Expt {train.etd}</span>
        {/if}
      </div>
      <div class="text-xl dest-name">
        {train.destination.name}
      </div>
      <div class="text-md" style:margin="6px 0 -4px">
        {@html train.etd !== "Cancelled" ? 'Platform' : '&nbsp;'}
      </div>
      <div class="text-xl">
        {@html train.etd !== "Cancelled" ? train.platform || "Wait" : '&nbsp;'}
      </div>
    </div>
    <div class="body">
      <div class="text-sm">
        <div class="yellow">{train.etd !== "Cancelled" ? 'Calling at:' : 'Was calling at:'}</div>
        {#each train.subsequentCallingPoints as station}
          <div class="flex" style:font-weight="{["WAT", "SOA"].includes(station.crs) ? "bold" : null}">
            <span>{station.locationName}</span>
            {#if train.etd !== "Cancelled"}
            <span>{station.et === "On time" ? station.st : station.et}</span>
            {/if}
          </div>
        {/each}
      </div>
      <div>
        <div style:margin-top="36px">
          Operated by {train.operator}
        </div>
      </div>
    </div>
  </div>
  {/each}
</div>