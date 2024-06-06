<script>
    export let imageUrl = "Laughingwater-Creek.jpg";
</script>

<div class="outer-container">
    <div class="inner-container">
        <h1 class="content-block">A Serene Retreat</h1>
        <p class="content-block passage-text">To demo, zoom up and decrease the window width. Note how only the image horizontally scrolls. Tables can also be handled this way.</p>
        <p class="content-block passage-text">This text remains within the window and does not horizontally scroll. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <div class="image-wrapper">
            <img src={imageUrl} alt="Placeholder Image">
        </div>
        <p class="content-block caption">A peaceful woodland stream. Do images go marginless at high zoom, as is shown, to maximize view area?</p>
        <h2 class="content-block">Primary Heading</h2>
        <p class="content-block passage-text">This text also remains within the window and does not horizontally scroll. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        <h3 class="content-block">Example of subheading</h3>
        <p class="content-block passage-text">This text also remains within the window and does not horizontally scroll. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    </div>
</div>

<style>
    body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        height: 100vh; /* Ensure the body takes the full viewport height */
    }

    .outer-container {
        width: 100vw; /* Full width of the viewport */
        height: calc(100vh - 60px);
        overflow-y: auto; /* Enable vertical scrolling */
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background-color: #E7F3D9;
        box-sizing: border-box;
    }

    .inner-container {
        max-width: 828px;
        width: 100%;
        text-align: left;
        background-color: rgb(255, 255, 255);
        padding: 48px 0px 48px 0px;

    }

.content-block {
    padding:0px 64px 0px 64px;
}

    .image-wrapper {
        position: relative;
        overflow-x: auto;
        padding:0px 64px 0px 64px;
        line-height: 0;
    }

    .image-wrapper img {
        width: 100%; /* Fixed width as per your original CSS */
        height: auto;
        line-height: 0;
    }


    /* Media query for screens smaller than 828px */
    @media (max-width: 828px) {
        .image-wrapper {
            padding: 0; /* Remove padding */
        }

        .image-wrapper img {
            width: 828px; /* Set image width to 828px */
        }
        .content-block {
  padding:0px 5% 0px 5%;
    }   
    }





h1 {
    color: green;
}


h2 {
    color: green;
}

h3 {
    color: green;
}

</style>