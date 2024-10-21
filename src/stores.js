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
import DIContext from './DIContext.svelte';
import Scene9 from './scene9.svelte';
import IntroSceneObject from './IntroSceneObject.svelte';



import Intro1 from './WaterScenes/Intro1.svelte';
import Intro2 from './WaterScenes/Intro2.svelte';
import NeededInfoItem from './WaterScenes/NeededInfoItem.svelte';
import EstimatesItem from './WaterScenes/EstimatesItem.svelte';
import EstimatesCorr from './WaterScenes/EstimatesCorr.svelte';
import ValueItem from './WaterScenes/ValueItem.svelte';
import ValueCorr from './WaterScenes/ValueCorr.svelte';
import TwentySecondItem from './WaterScenes/TwentySecondItem.svelte';
import TwentySecondCorr from './WaterScenes/TwentySecondCorr.svelte';



import { pulseHighlight } from './highlight.js'; // Import pulseHighlight

export const sidebarOpen = writable(false);
export const layoutMode = writable('tabs'); // 'tabs' or 'sidebar'
export const activeTab = writable(null); // Initialize with no active tab
export const activityPanelSize = writable('default');


// Define all scene groups in a single array with names
export const allScenes = [
    {
        name: "Water Task",
        scenes: [
            { component: Intro1, name: "Intro1" },
            { component: Intro2, name: "Intro2" },
            { component: NeededInfoItem, name: "NeededInfoItem" },
            { component: EstimatesItem, name: "EstimatesItem" },
            { component: EstimatesCorr, name: "EstimatesCorr" },
            { component: ValueItem, name: "ValueItem" },
            { component: ValueCorr, name: "ValueCorr" },
            { component: TwentySecondItem, name: "TwentySecondItem" },
            { component: TwentySecondCorr, name: "TwentySecondCorr" }
        ]
    },
    {
        name: "Playground",
        scenes: [
            { component: Scene0, name: "scene0: Notes" },
            { component: Scene1, name: "scene1: Two column layout + tabs" },
            { component: Scene2, name: "scene2: Two column stacks" },
            { component: Scene3, name: "scene3: Two column to tabs" },
            { component: Scene4, name: "scene4: Simple passage image test" },
            { component: Scene5, name: "scene5: Banner Image Passage" },
            { component: Scene6, name: "scene6: NOT USING THIS APPROACH" },
            { component: Scene7, name: "scene7: 2 avatars + dialog" },
            { component: IntroSceneObject, name: "IntroSceneObject: 1 avatar + object" },
            { component: DIContext, name: "DIContext: DI context" },
            { component: Scene8, name: " scene8: Organizer Test" },
            { component: Scene9, name: " scene9: Activity panel test" }
        ]
    }
];

// Store to hold the current group index
export const currentGroupIndex = writable(0);

// Store to hold the current scene's index within the current group
export const currentSceneIndex = writable(0);

// Derived store to get the current scenes based on the current group index
export const currentScenes = derived(
    currentGroupIndex,
    $currentGroupIndex => allScenes[$currentGroupIndex].scenes
);

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