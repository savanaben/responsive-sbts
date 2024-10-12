<script>
  import ImageContainer from './ImageContainer.svelte'; // Import the new ImageContainer component
  import { onMount } from 'svelte';
  import { tabSwitchAndHighlight } from './stores.js'; // Import the store
  export let imageUrl = ''; // URL of the avatar image
  export let name = ''; // Name to display below the image
  export let text = ''; // Text to display to the right of the image
  export let textStyle = 'default'; // New prop to control text content styles

    // Function to handle highlight
    function highlight() {
        tabSwitchAndHighlight.set('Organizer'); // Set the tab to switch to
    }

    // Function to handle click events in the text content
    function handleClick(event) {
        if (event.target.classList.contains('highlight-button')) {
            highlight();
        }
    }



    // Function to add classes to the first and last paragraphs
    function addParagraphClasses() {
        const textContentDivs = document.querySelectorAll('.text-content.bubble');
        textContentDivs.forEach(textContentDiv => {
            const paragraphs = textContentDiv.querySelectorAll('p');
            if (paragraphs.length > 0) {
                paragraphs[0].classList.add('first-paragraph');
                paragraphs[paragraphs.length - 1].classList.add('last-paragraph');
            }
        });
    }

    // Call the function after the component is mounted
    onMount(() => {
      addParagraphClasses();
    });

</script>

<div class="avatar-container">
  <ImageContainer {imageUrl} {name} /> <!-- Use the new ImageContainer component -->
  <div class="text-content {textStyle}" on:click={handleClick}>
      <div class="remove-top-margin">{@html text}</div> <!-- Use {@html} directive to render raw HTML -->
  </div>
</div>

<style>
  .avatar-container {
      display: flex;
      align-items: center;
      align-items: flex-start;
      margin-bottom: 1rem;
  }

  .text-content {
      flex-grow: 1;
      margin: 0 0 0 1rem;
      border-radius: 4px;
  }

  .text-content.default {
      line-height:  1.1;
  }

  .text-content.bubble {
      padding: .75rem;
      background-color: white;
  }


  .remove-top-margin {
      margin-top: 0;
  }
</style>