<script>
    import { writable } from 'svelte/store';
    import Tabs from './tabs.svelte';
    import Sidebar from './Sidebar.svelte';
    import { sidebarOpen, layoutMode, activeTab } from './stores.js';

    import LeftPanelContent from './LeftPanelContent.svelte';
    import Tab1Content from './tab1Content.svelte';
    import Tab2Content from './tab2Content.svelte';

    const breakpoint = writable(window.innerWidth);
    let tabs = [];
    let prevBreakpoint = $breakpoint;

    // Listen to window resize to adjust the breakpoint
    window.onresize = () => {
        breakpoint.set(window.innerWidth);
    };

    // Reactive statement to adjust tabs based on the breakpoint
    $: {
        if ($breakpoint < 800 && prevBreakpoint >= 800) {
            if ($layoutMode !== 'sidebar') {
                activeTab.set('Activity'); // Set the active tab to 'Activity'
            }
        }
        prevBreakpoint = $breakpoint;
        
        if ($breakpoint < 800) {
            tabs = [
                { title: 'Passage', component: Tab1Content, type: 'tab' },
                { title: 'Organizer', component: Tab2Content, type: 'tab' }
            ];

            if ($layoutMode === 'sidebar') {
                tabs.unshift({ title: 'Activity', action: () => sidebarOpen.set(true), type: 'button' });
                if ($activeTab === null || $activeTab === undefined) {
                    activeTab.set('Passage');
                }
            } else {
                tabs.unshift({ title: 'Activity', component: LeftPanelContent, type: 'tab' });
            }
        } else {
            tabs = [
                { title: 'Passage', component: Tab1Content, type: 'tab' },
                { title: 'Organizer', component: Tab2Content, type: 'tab' }
            ];
            if ($activeTab === 'Activity' || $activeTab === null || $activeTab === undefined) {
                activeTab.set('Passage');
            }
            sidebarOpen.set(false); // Close the sidebar when moving back to split view
        }
    }
</script>

<Sidebar>
    <div class="panel">
        <LeftPanelContent />
    </div>
</Sidebar>
<div class="layout">
    {#if $breakpoint > 800}
        <div class="layout">
            <div class="panel">
                <LeftPanelContent />
            </div>
            <div class="tab-panel">
                <Tabs {tabs} {activeTab} />
            </div>
        </div>
    {:else}
        <div class="tab-panel">
            <Tabs {tabs} {activeTab} />
        </div>
    {/if}
</div>
