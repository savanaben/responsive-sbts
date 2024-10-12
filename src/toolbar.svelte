<script>
    import { layoutMode, currentSceneIndex, currentGroupIndex, currentScenes } from './stores.js';
    import { derived } from 'svelte/store';

    function setMode(mode) {
        layoutMode.set(mode);
    }

    // Function to go to the next scene with wrapping
    function nextScene() {
        currentSceneIndex.update(n => {
            const group = $currentScenes;
            const newIndex = (n + 1) % group.length;
            console.log('Next Scene Index:', newIndex);
            return newIndex;
        });
    }

    // Function to go to the previous scene with wrapping
    function prevScene() {
        currentSceneIndex.update(n => {
            const group = $currentScenes;
            const newIndex = (n - 1 + group.length) % group.length;
            console.log('Previous Scene Index:', newIndex);
            return newIndex;
        });
    }

    // Function to change the current scene group
    function changeSceneGroup(index) {
        currentGroupIndex.set(index);
        currentSceneIndex.set(0); // Reset to the first scene in the new group
        console.log('Changed Scene Group:', index);
    }

    // Derived store to get the current scene text
    const sceneText = derived(
        [currentSceneIndex, currentScenes],
        ([$currentSceneIndex, $currentScenes]) => {
            const sceneDescriptions = [
                "Scene 1: 2 column layout with multiple tabs",
                "Scene 2: 2 column stacks",
                "Scene 3: 2 column changes to tabs. I don't think we'd take this option unless the right column is persistent.",
                "Scene 4: Standard passage with sidebars",
                "Scene 5: Banner image passage",
                "Scene 6: fluid intro test 1 - keep avatars",
                "Scene 7: fluid intro test 2 - avatar circles",
                "Scene 8: organizer test"
            ];
            return sceneDescriptions[$currentSceneIndex];
        }
    );
</script>

<div class="toolbar">
    <select class="toolbar-select" on:change="{(e) => changeSceneGroup(e.target.value === '0' ? 0 : 1)}">
        <option value="0">Task</option>
        <option value="1">Playground</option>
    </select>
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

    .toolbar-button, .toolbar-select {
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
        padding: 0 12px; /* Add padding for the select */
    }

    .toolbar-select {
        cursor: pointer; /* Change cursor to pointer */
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