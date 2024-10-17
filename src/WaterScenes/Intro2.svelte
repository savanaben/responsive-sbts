<script>
    import TwoPanelLayout from '../TwoPanelLayout.svelte';
    import WaterOrganizer from '../WaterOrganizer.svelte';
    import Avatar from '../Avatar.svelte';
    import BannerImage from '../BannerImage.svelte'; // Import the BannerImage component

    const bannerImagePath = 'border_waterdrop-full.png'; 

    let cardStates = ['hidden', 'hidden', 'hidden', 'hidden']; // States for each card

    const options = [
        { text: 'Lorem ipsum dolor sit amet', color: '#ff0000' },
        { text: 'Consectetur adipiscing elit', color: '#00ff00' },
        { text: 'Sed do eiusmod tempor', color: '#0000ff' }
    ];
</script>
<BannerImage imageUrl={bannerImagePath} /> 
<TwoPanelLayout 
leftBackgroundColor="#e6f5ef"
rightBackgroundColor="#e6f5ef"
stackedLeftBackgroundColor="#e6f5ef"
stackedRightBackgroundColor="#e6f5ef"
split="40/60"
mode="stack"
>
    <div slot="left">
        <Avatar 
        imageUrl="Tabitha_Portrait_Themed.svg" 
        name="Tabitha" 
        text='For my project, I am making a poster to show how much water people can save if they turn off the water while brushing their teeth.</p>'
        />
      <p><i>Select the <strong>Next</strong> button to continue.</i></p>
    </div>
    <div slot="right">
        <WaterOrganizer {cardStates} />
    </div>
</TwoPanelLayout>