<script>



</script>

<div class="container">
    <div class="text-box">
        <h1>Notes</h1>
        <p class="relaxed"> This prototype is for testing how to make SBTs, passages, and complex tasks responsive. How things look and function may not exactly match benchmark functionality and styles.</p>
        <ul>
            <li class="relaxed">Only run this in chrome.</li>
            <li class="relaxed">Select the Next and Back buttons to change scenes.</li>
        <li class="relaxed">Browser zoom in and change the window width/height to see how the scenes react.</li>
        <li class="relaxed">Some scenes will have additional buttons that change how the content displays at high zoom.</li>
        </ul>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: flex-start; /* Align items to the top */
        height: calc(100vh - 60px); /* Full viewport height minus 60px for the toolbar */
        padding: 8%; /* Margin of 10% */
        box-sizing: border-box; /* Include padding in the element's total width and height */
        overflow: auto; /* Enable scrolling */
        margin: auto;
    }

.relaxed {
    line-height: 1.3;
}

    .text-box {
        background-color: white;
        padding: 1.5rem;
        border-radius: 10px;
        text-align: left;
        max-width: 75ch;
    }

    h1 {
        margin-bottom: 10px;
        font-size: 26px;
    }


</style>