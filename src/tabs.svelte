<script>
    import { writable } from 'svelte/store';
    import { sidebarOpen, tabScrollPositions, activityPanelSize } from './stores.js';
    import ActivityPanel from './ActivityPanel.svelte';


    export let tabs = [];
    export let activeTab;
    export let paddingOption = 'Padding'; // New prop with default value 'Padding'. NoPadding removes tab container padding
    export let activityComponent = null; // New prop for the activity component
    export let hideActivityButton = false; // New prop to hide the Activity button

    let tabContent;
    let isActivityPanelOpen = false;



    // Function to handle tab click
    function handleTabClick(tab) {
        if (tabContent) {
            tabScrollPositions.update(positions => {
                positions[$activeTab] = tabContent.scrollTop;
                return positions;
            });
        }

        if (tab.action) {
            tab.action();
        } else {
            activeTab.set(tab.title);
        }
    }

    function toggleActivityPanel() {
        isActivityPanelOpen = !isActivityPanelOpen;
    }

    function closeActivityPanel() {
        isActivityPanelOpen = false;
    }

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
    {#if !hideActivityButton}
        <button 
            class="activity-button"
            class:active={isActivityPanelOpen}
            on:click={toggleActivityPanel}
        >
            Activity
        </button>
    {/if}
    <div class="tab-content" 
         class:no-padding={paddingOption === 'NoPadding'}
         bind:this={tabContent} 
         style="background-image: {tabs.find(tab => tab.title === $activeTab)?.backgroundImage || 'none'}; background-size: cover; background-position: bottom; background-repeat: no-repeat;">
        {#if $activeTab}
            {#each tabs as tab}
                {#if tab.title === $activeTab && !tab.action}
                    <svelte:component this={tab.component} />
                {/if}
            {/each}
        {/if}
    </div>
</div>

{#if !hideActivityButton}
    <ActivityPanel 
        isOpen={isActivityPanelOpen} 
        size={$activityPanelSize} 
        onClose={closeActivityPanel}
    >
        {#if activityComponent}
            <svelte:component this={activityComponent} />
        {/if}
    </ActivityPanel>
{/if}

<style>
    .tabs-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        max-width: 1366px;
        margin: auto;
        position: relative; /* Add this */
    }
    .tabs-buttons {
        position: sticky;
        top: 0;
        background: white;
        z-index: 1;
        padding: 8px 8px 0px 8px;
        border-bottom: 1px solid #c0c0c0;
        border-radius: 6px 6px 0px 0px;
        display: flex;
        background-color: #f8f8f8;
        align-items: center;
    }
    .tab-buttons {
        min-width: 45px;
        border: 1px solid #959595;
        border-bottom: 0px solid #c0c0c0;
        border-radius: 6px 6px 0px 0px;
        background: rgb(245, 245, 245);
    }
    .tab-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: 1.5rem;
        background-color: white;
    }
    .tab-content.no-padding {
        padding: 0;
        overflow-y: hidden;
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
    .activity-button {
        position: absolute;
        top: 8px;
        right: 8px;
        background-color: #ffffff;
        color: #333;
        font-weight: bold;
        border: 1px solid #959595;
        border-radius: 4px;
        padding: 5px 10px;
        z-index: 1001; /* Higher than the overlay */
    }
    .activity-button.active {
        background-color: #007bff;
        color: white;
        box-shadow: none;
    }
    .spacer {
        flex-grow: 1;
    }
</style>