import { writable } from 'svelte/store';
import Scene0 from './scene0.svelte';
import Scene1 from './scene1.svelte';
import Scene2 from './scene2.svelte';
import Scene3 from './scene3.svelte';
import Scene4 from './scene4.svelte';
import Scene5 from './scene5.svelte';
import { pulseHighlight } from './highlight.js'; // Import pulseHighlight


export const sidebarOpen = writable(false);
export const layoutMode = writable('tabs'); // 'tabs' or 'sidebar'
export const activeTab = writable(null); // Initialize with no active tab


export const currentSceneIndex = writable(0); // Store to hold the current scene's index
export const scenes = writable([Scene0, Scene1, Scene2, Scene3, Scene4, Scene5]); // Array of scenes

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