<script>
    import TwoPanelLayout from '../TwoPanelLayout.svelte';
    import Avatar from '../Avatar.svelte';
    import MultipleChoice from '../MultipleChoice.svelte';
    import Submit from '../Submit.svelte';
    import BannerImage from '../BannerImage.svelte'; // Import the BannerImage component
    import ContainerComponent from '../ContainerComponent.svelte'; // Import the ContainerComponent

    const bannerImagePath = 'border_waterdrop-full.png'; // Specify the path to your banner image


    const options = [
        { text: '1000 feet', color: '#ff0000' },
        { text: '20,000 feet', color: '#00ff00' },
        { text: '20,000 feet', color: '#00ff00' },
        { text: '20,000 feet', color: '#00ff00' }
    ];
</script>
<BannerImage imageUrl={bannerImagePath} /> <!-- Use the BannerImage component -->

<TwoPanelLayout 
    leftBackgroundColor="#e6f5ef"
    rightBackgroundColor="white"
    stackedLeftBackgroundColor="#e6f5ef"
    stackedRightBackgroundColor="#e6f5ef"
    split="40/60"
    mode="stack"
>
    <div slot="left">
    <Avatar 
    imageUrl="Tabitha_Portrait_Themed.svg" 
    name="Tabitha" 
    text='Here’s some information we need to find out how much water we use while we brush our teeth.</p>'
    />
    <ContainerComponent
            borderColor="#FEC30D"
            backgroundColor="#fff2cc"
            title="Information"
            body="<ul style='margin-bottom:0;'>
                    <li>Average number of times per day a person brushes teeth: 2</li>
                    <li>Average amount of time a person uses to brush teeth: 56 seconds</li>
                    <li>Typical water flow from faucet while a person brushes teeth: 0.04 gallon per second</li>
                  </ul>"
        />
    </div>
    <div slot="right">
        <p class="no-top-margin">Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the </p>
        <MultipleChoice {options} />
        <Submit/>
    </div>
</TwoPanelLayout>

<style>
    .no-top-margin:first-of-type {
        margin-top: 0;
    }
    
</style>