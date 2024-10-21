<script>
    import { writable } from 'svelte/store';
    import Tabs from './tabs.svelte';
    import { activeTab } from './stores.js';

    // Import all DI components
    import DI_1 from './DITabs/DI_1.svelte';
    import DI_2 from './DITabs/DI_2.svelte';
    import DI_3 from './DITabs/DI_3.svelte';
    // import DI_4 from './DITabs/DI_4.svelte';
    // import DI_5 from './DITabs/DI_5.svelte';
    // import DI_6 from './DITabs/DI_6.svelte';
    // import DI_7 from './DITabs/DI_7.svelte';
    // import DI_8 from './DITabs/DI_8.svelte';
    // import DI_9 from './DITabs/DI_9.svelte';
    // import DI_10 from './DITabs/DI_10.svelte';

    // Create tabs array
    const tabs = [
        { title: '1', component: DI_1 },
        { title: '2', component: DI_2 },
        { title: '3', component: DI_3 },
        // { title: '4', component: DI_4 },
        // { title: '5', component: DI_5 },
        // { title: '6', component: DI_6 },
        // { title: '7', component: DI_7 },
        // { title: '8', component: DI_8 },
        // { title: '9', component: DI_9 },
        // { title: '10', component: DI_10 },
    ];

    // Set initial active tab
    $:activeTab.set('1'); 

</script>

<div class="di-context">
    <Tabs {tabs} hideActivityButton={true} {activeTab} paddingOption="NoPadding" />
</div>

<style>

</style>