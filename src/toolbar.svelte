<script>
    import { layoutMode, currentSceneIndex, scenes } from './stores.js';

function setMode(mode) {
    layoutMode.set(mode);
}

    // Function to go to the next scene
    function nextScene() {
        if ($currentSceneIndex < $scenes.length - 1) {
            currentSceneIndex.update(n => n + 1);
        }
    }

    // Function to go to the previous scene
    function prevScene() {
        if ($currentSceneIndex > 0) {
            currentSceneIndex.update(n => n - 1);
        }
    }


  </script>
  
  <div class="toolbar">
    <button class="toolbar-button" on:click={prevScene}>Previous</button>
    <button class="toolbar-button" on:click={nextScene}>Next</button>
    <button class="toolbar-button" on:click={() => setMode('tabs')}>Tabs</button>
    <button class="toolbar-button" on:click={() => setMode('sidebar')}>Sidebar</button>
</div>
  
  <style>
    .toolbar {
      position: fixed; /* Fix the toolbar at the top of the viewport */
      top: 0; /* Align to the top edge */
      left: 0; /* Align to the left edge */
      width: 100%; /* Span the full width of the viewport */
      height: 60px; /* Set the height of the toolbar */
      background-color: rgb(233, 233, 233); /* Set the background color to light gray */
      display: flex;
      justify-content: flex-start;
      z-index: 1000; /* Ensure the toolbar is above other content */
    }

    .toolbar-button {
        margin: 6px;
        border-color: transparent;
        background-color: white;
        color: rgb(0, 100, 232);
        border-radius: 6px;
        display: flex; /* New: Enable flexbox */
        align-items: center; /* New: Center the text vertically */
        justify-content: center; /* New: Center the text horizontally */
    }
  </style>