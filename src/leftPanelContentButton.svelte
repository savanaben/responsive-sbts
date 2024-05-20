<script>
    import Avatar from './Avatar.svelte';
    import { pulseHighlight } from './highlight.js'; // Import pulseHighlight

    function highlight() {
        const node = document.getElementById('highlight-target'); // Select the p element with id 'highlight-target'
        pulseHighlight(node);
    }

  </script>
  
  <div>
    <Avatar 
      imageUrl="/diana-mugshot-square.png" 
      name="Jane Doe" 
      text="It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief. " 
    />
    <p>I updated the organizer with <button on:click={highlight} class="highlight-button">topic 2</button>.</p>


  </div>

  <style>
   .highlight-button {
        padding: 0px 4px 0px 4px;
        color: rgb(0, 100, 232);
        background-color: white;
        border-radius: 4px;
    }
   
   /* .highlight-button {
        display: none;
    }
    @media (max-width: 800px) {
        .highlight-button {
            display: block;
        }
    } */
</style>