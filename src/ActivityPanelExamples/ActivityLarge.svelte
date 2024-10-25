<script>
    import { writable } from 'svelte/store';
    import Tabs from '../tabs.svelte';
    import { activeTab, activityPanelSize } from '../stores.js';  // Add activityPanelSize here

    // Import all DI components
    import scene4 from '../scene4.svelte';
    import DI_1 from '../DITabs/DI_1.svelte';
    import DI_2 from '../DITabs/DI_2.svelte';
    import DI_3 from '../DITabs/DI_3.svelte';

    // Create tabs array
    const tabs = [
        { title: 'Passage Title', component: scene4 },
        { title: 'Organizer', component: DI_1 },
        { title: 'Video', component: DI_2 },

    ];

    // Set initial active tab
    $:activeTab.set('Passage Title'); 

    activityPanelSize.set('large');

</script>

<div class="di-context">
    <Tabs {tabs} 
    {activeTab} 
    paddingOption="NoPadding" 
    hideActivityButton={false} 
    activityComponent={DI_3} 
    />
</div>

<style>

</style>