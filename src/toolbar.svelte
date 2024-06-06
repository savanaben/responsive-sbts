<script>
    import { layoutMode, currentSceneIndex, scenes } from './stores.js';
    import { derived } from 'svelte/store';

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

    // Derived store to get the current scene text
    const sceneText = derived(currentSceneIndex, $currentSceneIndex => {
        switch ($currentSceneIndex) {
            case 0:
                return "";
            case 1:
                return "2 column layout with multiple tabs";
            case 2:
                return "2 column stacks";
            case 3:
                return "2 column changes to tabs";
            case 4:
                return "Standard passage with sidebars";
            case 5:
                return "Banner image passage";
            default:
                return "";
        }
    });
</script>

<div class="toolbar">
    <button class="toolbar-button" on:click={prevScene}>Back</button>
    <button class="toolbar-button" on:click={nextScene}>Next</button>
    {#if $currentSceneIndex === 1}
        <button class="toolbar-button" on:click={() => setMode('tabs')}>Tabs</button>
        <button class="toolbar-button" on:click={() => setMode('sidebar')}>Sidebar</button>
    {/if}
    <div class="scene-text">{$sceneText}</div>
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
        align-items: center;
        z-index: 1000; /* Ensure the toolbar is above other content */
        padding: 0 6px; /* Add some padding */
    }

    .toolbar-button {
        margin: 6px;
        font-size: 20px;
        border-color: transparent;
        background-color: white;
        color: rgb(0, 100, 232);
        height: -webkit-fill-available;
        border-radius: 6px;
        display: flex; /* Enable flexbox */
        align-items: center; /* Center the text vertically */
        justify-content: center; /* Center the text horizontally */
    }

    .scene-text {
        font-size: 18px;
        margin-left: auto; /* Push the text to the right */
        text-align: left;
        flex: 1; /* Allow the text to take up remaining space */
        white-space: pre-wrap; /* Allow text to wrap to 2 lines */
        padding:6px 6px 6px 6px;
    }
</style>