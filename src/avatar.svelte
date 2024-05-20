<script>
    export let imageUrl = ''; // URL of the avatar image
    export let name = ''; // Name to display below the image
    export let text = ''; // Text to display to the right of the image
  </script>
  
  <div class="avatar-container">
    <div class="image-container">
      <img src={imageUrl} alt={name} />
      <p class="nameplate">{name}</p>
    </div>
    <p class="text-content">{text}</p> <!-- Updated part: regular paragraph text -->
  </div>
  
  <style>
    .avatar-container {
      display: flex;
      align-items: center; 
      align-items: flex-start;
      
    }
  
    .image-container {
      text-align: center; 
    }
  
    img {
      width: 110px;
      height: 110px;
      border-radius: 50%; 
      object-fit: cover; 
      border: 2px solid #a9a9a9;
    }
  
    .nameplate {
      font-size: 0.8em; 
      margin: 0;
      font-weight: bold;
    }
  
    .text-content {
      flex-grow: 1; 
      margin: 0 0 0 1rem;
      border-radius: 4px; 
      
    }
  </style>