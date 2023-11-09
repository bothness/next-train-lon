<script>
  export let type = "chevron";
  export let rotation = 0;
  export let scale = 1;
  export let clickable = false;

  const paths = {
      chevron: "M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z",
      train: "M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
    };
</script>

<svg
  class="ico"
  viewBox="0 0 24 24"
  fill-rule="evenodd"
  clip-rule="evenodd"
  aria-hidden="true"
  focusable="false"
  style:transform="rotate({-rotation}deg) scale({scale})"
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