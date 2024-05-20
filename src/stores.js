import { writable } from 'svelte/store';
import Scene1 from './scene1.svelte';
import Scene2 from './scene2.svelte';
import { pulseHighlight } from './highlight.js'; // Import pulseHighlight


export const sidebarOpen = writable(false);
export const layoutMode = writable('tabs'); // 'tabs' or 'sidebar'
export const activeTab = writable(null); // Initialize with no active tab


export const currentSceneIndex = writable(0); // Store to hold the current scene's index
export const scenes = writable([Scene1, Scene2]); // Array of scenes

export const highlightStore = writable(null);
export { pulseHighlight }; // Export pulseHighlight