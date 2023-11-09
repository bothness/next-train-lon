<script>
  // @ts-nocheck
  import "../../app.css";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import Swipe from "$lib/bundled/Swipe.svelte";
  import SwipeItem from "$lib/bundled/SwipeItem.svelte";
  import Icon from "$lib/Icon.svelte";

  export let data;

  let swipe;
  $: destination = $page.params.direction;

  let index = 0;
  let height = 0;
  let h = {};

  function heightChanged({detail}) {
    console.log("change", detail);
    index = detail.active_item
    height = h[index];
  }

  const swipeConfig = {
    autoplay: false,
    transitionDuration: 400,
    defaultIndex: 0,
  };

  afterNavigate(() => {
    index = 0;
    height = h[index];
  });
</script>

<svelte:head>
  <title>Rob's next train to London</title>
</svelte:head>

<div class="container" style:height="{height + 48}px">
  <div class="selector" style:justify-content={destination === "out" ? "flex-start" : "flex-end"}>
    {#if destination === "out"}
    <a href="{base}/rtn/"><Icon rotation={180}/><span>View return trains</span><Icon type="train" scale={1.3}/></a>
    {:else}
    <a href="{base}/out/"><Icon type="train" scale={1.3}/><span>View outgoing trains</span><Icon/></a>
    {/if}
  </div>
  {#key data}
  {#if data.trainServices[1]}
  <div class="next-prev">
    <button title="Previous" on:click={() => swipe.prevItem()} style:visibility={index === 0 ? 'hidden' : null}><Icon rotation="180"/></button>
    <button title="Next" on:click={() => swipe.nextItem()} style:visibility={index === data.trainServices.length - 1 ? 'hidden' : null}><Icon/></button>
  </div>
  {/if}
  {#if data.trainServices[0]}
  <Swipe {...swipeConfig} bind:this={swipe} on:change={heightChanged}>
    {#each data.trainServices as train, i}
    <SwipeItem allow_dynamic_height={true}>
      <div
        class="train"
        class:cancelled={train.etd === "Cancelled"}
        class:noplatform={!train.platform && train.etd !== "Cancelled"}
        bind:clientHeight={h[i]}>
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