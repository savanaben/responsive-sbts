<script>
    export let imageUrl = ''; // Prop for the image path
  </script>

  <div class="banner-image-wrapper">
  <div class="banner-image-container">
    <img src={imageUrl} alt="Banner Image" class="banner-image" />
  </div>
</div>
 
 
 <style>
.banner-image-wrapper {
        display: flex;
        justify-content: center; /* Center the container horizontally */
        width: 100%; /* Ensure the wrapper takes full width */
    }
    .banner-image-container {
        position: relative; /* Position relative to allow absolute positioning of the image */
        width: 1366px; /* Full width of the container */
        overflow: visible;
        height: 50px;

        background-color: white;
    }
  
    .banner-image {
        position: absolute; /* Position the image absolutely within the container */
        width: 1366px;
        right: 0; /* Anchor the image to the right */
        object-fit: cover; /* Ensure the image covers the container without distortion */
    }
  </style>