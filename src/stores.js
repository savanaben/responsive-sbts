import { writable, derived } from 'svelte/store';
import Scene0 from './scene0.svelte';
import Scene1 from './scene1.svelte';
import Scene2 from './scene2.svelte';
import Scene3 from './scene3.svelte';
import Scene4 from './scene4.svelte';
import Scene5 from './scene5.svelte';
import Scene6 from './scene6.svelte';
import Scene7 from './scene7.svelte';
import Scene8 from './scene8.svelte';

import Intro1 from './WaterScenes/Intro1.svelte';
import Intro2 from './WaterScenes/Intro2.svelte';
import NeededInfoItem from './WaterScenes/NeededInfoItem.svelte';
import EstimatesItem from './WaterScenes/EstimatesItem.svelte';
import EstimatesCorr from './WaterScenes/EstimatesCorr.svelte';
import ValueItem from './WaterScenes/ValueItem.svelte';


import { pulseHighlight } from './highlight.js'; // Import pulseHighlight

export const sidebarOpen = writable(false);
export const layoutMode = writable('tabs'); // 'tabs' or 'sidebar'
export const activeTab = writable(null); // Initialize with no active tab


// Define all scene groups in a single array
const allScenes = [
    [Intro1, Intro2, NeededInfoItem, EstimatesItem, EstimatesCorr, ValueItem],  // Group 2
    [Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8]// Group 1

];

// Store to hold the current group index
export const currentGroupIndex = writable(0);

// Store to hold the current scene's index within the current group
export const currentSceneIndex = writable(0);

// Derived store to get the current scenes based on the current group index
export const currentScenes = derived(currentGroupIndex, $currentGroupIndex => allScenes[$currentGroupIndex]);

export const highlightStore = writable(null);
export const highlightTarget = writable({ element: null, tab: null }); // New store for highlight target and tab

export const tabSwitchAndHighlight = writable(null); // New store for tab switching and highlighting

export const tabScrollPositions = writable({}); // Store for tab scroll positions

export { pulseHighlight }; // Export pulseHighlight

export function getBackgroundStyle(imageUrl) {
    return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat'
    };
}