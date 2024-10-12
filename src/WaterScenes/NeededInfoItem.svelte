<script>
    import TwoPanelLayout from '../TwoPanelLayout.svelte';
    import Avatar from '../Avatar.svelte';    
    import MultipleChoice from '../MultipleChoice.svelte';
    import Submit from '../Submit.svelte';
    import BannerImage from '../BannerImage.svelte'; // Import the BannerImage component

    const bannerImagePath = '/border_waterdrop-full.png'; // Specify the path to your banner image


    const options = [
        { text: 'Lorem Ipsum is simply dummy text of the', color: '#ff0000' },
        { text: 'Lorem Ipsum is simply dummy text of the printing', color: '#00ff00' },
        { text: 'Lorem Ipsum is simply dummy text of the', color: '#00ff00' },
        { text: 'Lorem Ipsum is simply dummy text of the printing and', color: '#00ff00' },
        { text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lor', color: '#00ff00' },
        { text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has', color: '#0000ff' }
    ];
</script>
<BannerImage imageUrl={bannerImagePath} /> <!-- Use the BannerImage component -->

<TwoPanelLayout 
leftBackgroundColor="#e6f5ef"
rightBackgroundColor="white"
stackedLeftBackgroundColor="#e6f5ef"
stackedRightBackgroundColor="#e6f5ef"
    leftBannerImage={bannerImagePath} 
    rightBannerImage={bannerImagePath} 
    stackedLeftBannerImage={bannerImagePath}
    split="40/60"
mode="stack"
>
    <div slot="left">
        <Avatar 
        imageUrl="Tabitha_Portrait_Themed.svg" 
        name="Tabitha" 
        text='We need some information to find the amount of water that people use while brushing their teeth.</p>'
        />
    </div>
    <div slot="right">
        <p class="no-top-margin">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the </p>
        <MultipleChoice {options} />
        <Submit/>
    </div>
</TwoPanelLayout>

<style>
    .no-top-margin:first-of-type {
        margin-top: 0;
    }
</style>