<script>
    import { pulseHighlight } from './stores.js'; // Import pulseHighlight from stores.js



    let title1 = "Topic 1";
    let title2 = "Topic 2";
    let text = "Demo of the different value of the background-image property. Demo of the different values of the background-image property.";
    let text2 = "Here's some key facts we decided to add to this topic.";
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
    .background {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5rem;
        box-sizing: border-box;
        position: relative; /* Ensure the position context for the pseudo-element */
    }

    @media (max-width: 1000px) {
        .background::before {
            content: '';
            position: absolute;
            top: -1.5rem; /* Extend the gradient out by 1.5rem */
            right: -1.5rem; /* Extend the gradient out by 1.5rem */
            bottom: -1.5rem; /* Extend the gradient out by 1.5rem */
            left: -1.5rem; /* Extend the gradient out by 1.5rem */
            background: linear-gradient(180deg, rgba(255,255,255,1) 5%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 100%);
            z-index: 0; /* Keep it behind the boxes */
        }
    }

    .box {
        background-color: white;
        padding: 1rem;
        border-radius: 10px;
        min-width: 250px;
        box-sizing: border-box;
        flex: 1;
        position: relative; /* Ensure boxes are above the gradient */
        z-index: 1;
    }

    #highlight-target {
    background-color: #F3D5FF;
    outline: #A12ECF;
    outline-style: solid;
    outline-width: 1px;
    }

    h3 {
        margin-top: 0;
    }
    
</style>