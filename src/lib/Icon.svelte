<script>
  export let type = "chevron";
  export let rotation = 0;
  export let position = "inline";
  export let clickable = false;
  export let margin = false;

  const paths = {
      chevron: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
      arrow: "M5,13h11.2l-2.9,2.9c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l4.6-4.6c0.4-0.4,0.4-1,0-1.4l-4.6-4.6c-0.4-0.4-1-0.4-1.4,0c0,0,0,0,0,0c-0.4,0.4-0.4,1,0,1.4l2.9,2.9H5c-0.6,0-1,0.4-1,1S4.4,13,5,13z",
    };

  $: style = `transform: translate(0, 15%) scale(1.5) rotate(${-rotation}deg);${["left", "right"].includes(position) ? ` position: absolute; ${position}: 10px;` : ''}`;
</script>

<svg
  class="ico"
  viewBox="0 0 24 24"
  fill-rule="evenodd"
  clip-rule="evenodd"
  aria-hidden="true"
  focusable="false"
  {style}
  class:margin
  class:noclick={!clickable}>
  <path d={paths[type]}></path>
</svg>

<style>
  .ico {
    position: inherit;
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: visible;
    transition: all 0.3s ease-out;
  }
  .noclick {
    pointer-events: none;
  }
  .margin {
    margin: 0 6px 0 1px;
  }
</style>