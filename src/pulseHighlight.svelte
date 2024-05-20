<script>
    import { highlightStore } from './stores.js';

    // Create a store to hold the element to highlight

    let myDiv; // New: Declare a variable to hold the reference to the div

    

    export function pulseHighlight(node, duration = 1000) {
        // Function to pulse the node
        function pulse() {
            node.style.animation = `pulse ${duration}ms infinite`;
        }

        // Scroll to the node if it's not in view
        if (!node.scrollIntoViewIfNeeded) {
            node.scrollIntoView({ behavior: 'smooth' });
        } else {
            node.scrollIntoViewIfNeeded({ behavior: 'smooth' });
        }

        // Pulse the node after scrolling to it
        setTimeout(pulse, 500);

        // Subscribe to the highlightStore
        const unsubscribe = highlightStore.subscribe(value => {
            if (value === node) {
                pulse();
            } else {
                node.style.animation = '';
            }
        });

        return {
            destroy() {
                // Clean up when the node is removed
                node.style.animation = '';
                unsubscribe();
            }
        };
    }
</script>

<style>
    @keyframes pulse {
        0% { background-color: transparent; }
        50% { background-color: purple; }
        100% { background-color: transparent; }
    }
    .placeholder {
        position: relative;
        width: 100px; /* Adjust as needed */
        height: 100px; /* Adjust as needed */
    }
    .highlighted {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<button on:click={() => pulseHighlight(myDiv)}>Highlight</button> <!-- Updated: Use myDiv directly -->
<div class="placeholder">
    <div bind:this={myDiv} class="highlighted">Some content</div> <!-- Updated: Use bind:this to bind the div to myDiv -->
</div>