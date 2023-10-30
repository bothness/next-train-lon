<script>
  import "../app.css";

  export let data;

  console.debug(data);
</script>

<svelte:head>
  <title>Rob's next train to London</title>
</svelte:head>

{#each data.trainServices as train}
<div class="header">
  <div class="text-lg">
    {train.etd === "On time" ? train.std : train.etd}<br/>
    {train.destination.name}
  </div>
  <div class="text-md">
    Platform
  </div>
  <div class="text-lg">
    {train.platform}
  </div>
</div>
<div class="body">
  <div class="text-sm">
    <div class="yellow">Calling at:</div>
    {#each train.subsequentCallingPoints as station}
      <div class="flex">
        <span>{station.locationName}</span>
        <span>{station.et === "On time" ? station.st : station.et}</span>
      </div>
    {/each}
    <div style:margin-top="48px">
      Operated by {train.operator}
    </div>
  </div>
</div>
{/each}