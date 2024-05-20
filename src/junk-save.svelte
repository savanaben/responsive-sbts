<script>
	import Panel from './panel.svelte';
	import Toolbar from './toolbar.svelte';
	import Avatar from './Avatar.svelte';
	import Tabs from './tabs.svelte';

  </script>
  <div class="app-container">
  <Toolbar>

  </Toolbar>
  <div class="layout">
	<Panel width="50%" side="left">
	  <!-- Content for left panel -->
	  <Avatar 
	  imageUrl="/diana-mugshot-square.png" 
	  name="Jane Doe" 
	  text="It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, " 
	  />
	  <p>It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us.</p>
	  <p>It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us.</p>
	  <p>It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us.</p>
	  <p>It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us.</p>
	  <p>It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us.</p>
	</Panel>
	<Panel width="50%" side="right">
	  <!-- Content for right panel -->
	  <Tabs />
	</Panel>
  </div>
</div>
  
  <style>

.app-container {
    position: relative; /* Ensures the container is positioned relative to its normal position */
    padding-top: 60px; /* Space for the toolbar */
    height: 100vh; /* Full height of the viewport */
    width: 100%; /* Full width of the viewport */
    box-sizing: border-box; /* Includes padding in the height calculation */
  }


	.layout {
	  display: flex;
	  justify-content: center; /* Center the panels horizontally */
	  align-items: center; /* Center the panels vertically */
	  max-width: 1366px;
	  margin: auto; /* Centers the layout in the page */
	  width: 100%; /* Ensures the layout takes full width */
	}

	/* Example of changing to 40/60 layout at a specific breakpoint */
	@media (min-width: 600px) and (max-width: 1200px) {
	  :global(.left) {
		flex: 0 0 40%;
	  }
	  :global(.right) {
		flex: 0 0 60%;
	  }
	}

	/* Ensure stacking at lower widths */
	@media (max-width: 800px) {
	  .layout {
	    flex-direction: column; /* Stacks the panels */
		align-items: stretch; /* Ensures children (panels) stretch to fill the container */

	  }
	}
</style>