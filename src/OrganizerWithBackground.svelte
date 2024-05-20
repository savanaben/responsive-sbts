<script>
    import { pulseHighlight } from './stores.js'; // Import pulseHighlight from stores.js



    let title1 = "Topic 1";
    let title2 = "Topic 2";
    let text = "Demo of the differenvalue of the background-image property. Demo of the different values ofthe background-image property.";
    let text2 = "does the highlight work on this.";
</script>

<div class="background">
   
    <div class="box">
        <h3>{title1}</h3>
        <p>{text}</p>
    </div>
    <div class="box">
        <h3>{title2}</h3>
        <p id="highlight-target">{text2}</p> <!-- Removed use:pulseHighlight -->
    </div>

</div>

<style>

#highlight-target {
    background-color: #f6d4ff;
    }
    .background {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap; /* Allow the boxes to wrap onto a new line */
        gap: 0.5rem; /* Create a 1rem gap between the boxes */
        box-sizing: border-box;
    }

    
    .box {
        background-color: white;
        padding: 1rem;
        border-radius: 10px;
        min-width: 250px; /* New: Set a minimum width for the boxes */
        box-sizing: border-box;
        flex: 1; /* New: Allow the boxes to grow and shrink */
    }
</style>