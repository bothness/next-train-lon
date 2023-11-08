<script>
  export let type = "chevron";
  export let rotation = 0;
  export let clickable = false;

  const paths = {
      chevron: "M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z",
      arrow: "M5,13h11.2l-2.9,2.9c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l4.6-4.6c0.4-0.4,0.4-1,0-1.4l-4.6-4.6c-0.4-0.4-1-0.4-1.4,0c0,0,0,0,0,0c-0.4,0.4-0.4,1,0,1.4l2.9,2.9H5c-0.6,0-1,0.4-1,1S4.4,13,5,13z",
    };
</script>

<svg
  class="ico"
  viewBox="0 0 24 24"
  fill-rule="evenodd"
  clip-rule="evenodd"
  aria-hidden="true"
  focusable="false"
  style:transform="rotate({-rotation}deg)"
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
</style>