<script>
    import { writable } from 'svelte/store';
    import { sidebarOpen, tabScrollPositions } from './stores.js';

    export let tabs = [];
    export let activeTab;

    let tabContent;

    // Function to handle tab click
    function handleTabClick(tab) {
        // Save the current scroll position if tabContent is defined
        if (tabContent) {
            tabScrollPositions.update(positions => {
                positions[$activeTab] = tabContent.scrollTop;
                return positions;
            });
        }

        if (tab.action) {
            tab.action(); // Execute the action if it exists
        } else {
            activeTab.set(tab.title); // Set the active tab normally
        }
    }

    // Restore the scroll position when the active tab changes
    $: {
        if (tabContent) {
            tabScrollPositions.subscribe(positions => {
                if (positions[$activeTab] !== undefined && tabContent) {
                    tabContent.scrollTop = positions[$activeTab];
                }
            });
        }
    }
</script>

<div class="tabs-container">
    <div class="tabs-buttons">
        {#each tabs as tab}
            <button class="tab-buttons"
                class:active={tab.title === $activeTab}
                class:sidebar-button={tab.action}
                on:click={() => handleTabClick(tab)}
            >
                {tab.title}
            </button>
        {/each}
    </div>
    <div class="tab-content" bind:this={tabContent} style="background-image: {tabs.find(tab => tab.title === $activeTab)?.backgroundImage || 'none'}; background-size: cover; background-position: bottom; background-repeat: no-repeat;">
        {#if $activeTab}
            {#each tabs as tab}
                {#if tab.title === $activeTab && !tab.action}
                    <svelte:component this={tab.component} />
                {/if}
            {/each}
        {/if}
    </div>
</div>

<style>
    .tabs-container {
        display: flex; /* Use Flexbox */
        flex-direction: column; /* Stack children vertically */
        height: 100%; /* Ensures the container takes up the full height of its parent */
    }
    .tabs-buttons {
        position: sticky; /* Makes the tab buttons sticky */
        top: 0; /* Aligns the sticky element at the top of its container */
        background: white; /* Ensures the sticky element has a background */
        z-index: 1; /* Ensures the sticky element is above the content */
        padding: 8px 8px 0px 8px;
        border-bottom: 1px solid #c0c0c0;
        border-radius: 6px 6px 0px 0px;
        display: flex;
    }
    .tab-buttons {
        position: sticky; /* Makes the tab buttons sticky */
        top: 0; /* Aligns the sticky element at the top of its container */
        background: rgb(245, 245, 245); /* Ensures the sticky element has a background */
        z-index: 1; /* Ensures the sticky element is above the content */

        border-bottom: 0px solid #c0c0c0;
        border-radius: 6px 6px 0px 0px;
    }

    .tab-content {
        overflow-y: auto; /* Allows vertical scrolling within the content area */
        flex-grow: 1; /* Takes up remaining space after .tabs-buttons */
        padding: 1.5rem; /* Creates space for the sticky tab buttons, adjust as needed */
        background-color: white;
    }
    .active {
        font-weight: bold;
        cursor: pointer;
        background-color: white;
        border-bottom: none;
        box-shadow: 0px 2px 0px 0px rgba(255,255,255,1);
    }
    .sidebar-button {
        margin:0 8px 8px 0px;
        background-color: #ffffff;
        color: rgb(13, 105, 202);
        border: 1px solid #969696;
        border-radius: 4px;
    }
</style>