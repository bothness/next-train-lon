<script>
  // @ts-nocheck
  import "../../app.css";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { Swipe, SwipeItem } from "svelte-swipe";
  import Icon from "$lib/Icon.svelte";

  export let data;

  let swipe;
  let destination = $page.params.direction;

  const swipeConfig = {
    autoplay: false,
    transitionDuration: 400,
    defaultIndex: 0,
  };
</script>

<svelte:head>
  <title>Rob's next train to London</title>
</svelte:head>

<div class="container">
  <div class="selector">
    <label>
      <span>Destination</span>
      <select bind:value={destination} on:change={() => goto(`${base}/${destination}`)}>
        <option value="out">London Waterloo</option>
        <option value="rtn">Southampton Airport Parkway</option>
      </select>
    </label>
  </div>
  {#key data}
  {#if data.trainServices[1]}
  <div class="next-prev">
    <button title="Previous" on:click={() => swipe.prevItem()}><Icon rotation="180"/></button>
    <button title="Next" on:click={() => swipe.nextItem()}><Icon/></button>
  </div>
  {/if}
  {#if data.trainServices[0]}
  <Swipe {...swipeConfig} bind:this={swipe}>
    {#each data.trainServices as train}
    <SwipeItem>
      <div class="train" class:cancelled={train.etd === "Cancelled"} class:noplatform={!train.platform && train.etd !== "Cancelled"}>
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
    </SwipeItem>
    {/each}
  </Swipe>
  {:else}
  <div class="train cancelled">
    <div class="header">
      <div class="text-lg">No upcoming trains</div>
    </div>
    <div class="body" />
  </div>
  {/if}
  {/key}
</div>