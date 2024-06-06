<script>
    import { highlightTarget, activeTab } from './stores.js';

    export function pulseHighlight(node, duration = 1000) {
        // Function to pulse the node
        function pulse() {
            node.style.animation = `pulse ${duration}ms infinite`;
            setTimeout(() => {
                node.style.animation = '';
            }, duration); // Remove pulse animation after duration
        }

        // Scroll to the node if it's not in view
        function scrollToNode() {
            if (!node.scrollIntoViewIfNeeded) {
                node.scrollIntoView({ behavior: 'smooth' });
            } else {
                node.scrollIntoViewIfNeeded({ behavior: 'smooth' });
            }
        }

        // Subscribe to the highlightTarget store
        const unsubscribe = highlightTarget.subscribe(value => {
            if (value.element === node) {
                if (value.tab) {
                    activeTab.set(value.tab);
                    setTimeout(() => {
                        scrollToNode();
                        pulse();
                    }, 500); // Ensure the tab switch happens first
                } else {
                    scrollToNode();
                    pulse();
                }
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
</style>