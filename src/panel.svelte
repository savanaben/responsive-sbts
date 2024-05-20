<script>
    export let width = '50%'; // Default width
    export let side; // Optional: 'left' or 'right' if needed for specific styling
    export let containsTabs = false; // New prop to indicate if the panel contains a Tabs component
</script>

<div class={side ? `panel ${side} ${containsTabs ? 'no-padding' : ''}` : `panel ${containsTabs ? 'no-padding' : ''}`} style="flex: 0 0 {width}">
    <slot></slot> <!-- This allows any content to be placed inside the panel -->
</div>

<style>
    /* Responsive adjustments */
    @media (max-width: 800px) {
      .panel {
        flex-basis: 100%; /* Stacks the panels at smaller screen widths */
      }
    }

    .panel {
        padding: 20px; 
    }
    .no-padding {
        padding: 0;  
    }
</style>