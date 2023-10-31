<script>
  import "../app.css";

  export let data;

  console.debug(data);
</script>

<svelte:head>
  <title>Rob's next train to London</title>
</svelte:head>

<main class="container" style:width="{data.trainServices.length * 400}px">
  {#each data.trainServices as train, i}
  <div class="train" class:first={i === 0}>
    <div class="header">
      <div class="text-lg flex">
        <span>{train.std}</span>
        {#if train.etd !== "On time"}
        <span>Expt {train.etd}</span>
        {/if}
      </div>
      <div class="text-lg">
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
      </div>
      <div class="text-sm">
        <div style:margin-top="36px">
          Operated by {train.operator}
        </div>
      </div>
    </div>
  </div>
  {/each}
</main>