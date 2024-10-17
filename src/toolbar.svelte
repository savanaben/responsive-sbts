<script>
    import { layoutMode, currentSceneIndex, currentGroupIndex, currentScenes, allScenes } from './stores.js';
    import { derived } from 'svelte/store';

    function setMode(mode) {
        layoutMode.set(mode);
    }

    function nextScene() {
        currentSceneIndex.update(n => ($currentScenes.length > 0 ? (n + 1) % $currentScenes.length : 0));
    }

    function prevScene() {
        currentSceneIndex.update(n => ($currentScenes.length > 0 ? (n - 1 + $currentScenes.length) % $currentScenes.length : 0));
    }

    function changeSceneGroup(index) {
        currentGroupIndex.set(index);
        currentSceneIndex.set(0);
    }

    const sceneInfo = derived(
        [currentGroupIndex, currentSceneIndex, currentScenes],
        ([$currentGroupIndex, $currentSceneIndex, $currentScenes]) => {
            const currentGroup = allScenes[$currentGroupIndex];
            const currentScene = $currentScenes[$currentSceneIndex];
            return {
                groupName: currentGroup.name,
                sceneName: currentScene ? currentScene.name : `Scene ${$currentSceneIndex + 1}`
            };
        }
    );
</script>

<div class="toolbar">
    <select class="toolbar-select" on:change="{(e) => changeSceneGroup(parseInt(e.target.value))}">
        {#each allScenes as group, index}
            <option value={index}>{group.name}</option>
        {/each}
    </select>
    <button class="toolbar-button" on:click={prevScene}>Back</button>
    <button class="toolbar-button" on:click={nextScene}>Next</button>
    {#if $currentSceneIndex === 1 && $currentGroupIndex === 1}
        <button class="toolbar-button" on:click={() => setMode('tabs')}>Tabs</button>
        <button class="toolbar-button" on:click={() => setMode('sidebar')}>Sidebar</button>
    {/if}
    <div class="scene-text">{$sceneInfo.groupName}: {$sceneInfo.sceneName}</div>
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