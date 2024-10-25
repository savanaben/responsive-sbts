<script>
    import TwoPanelLayout from '../TwoPanelLayout.svelte';
    import Avatar from '../Avatar.svelte';
    import MultipleChoice from '../MultipleChoice.svelte';
    import ContainerComponent from '../ContainerComponent.svelte'; 
    import ImagePlaceholder from '../ImagePlaceholder.svelte'; 
    import ImageWrapper from '../ImageWrapper.svelte'; 

    export let imageUrl = "Laughingwater-Creek.jpg";


    const options = [
        { text: '1000 feet', color: '#ff0000' },
        { text: '20,000 feet', color: '#00ff00' },
        { text: '20,000 feet', color: '#00ff00' },
        { text: '20,000 feet', color: '#00ff00' }
    ];
</script>

<TwoPanelLayout 
    leftBackgroundColor=""
    rightBackgroundColor=""
    stackedLeftBackgroundColor=""
    stackedRightBackgroundColor=""
    split="50/50"
    mode="stack"
>
    <div slot="left">
        <Avatar 
            imageUrl="Tabitha_Portrait_Themed.svg" 
            name="Tabitha" 
            text='Here’s some information we need to find out how much water we use while we brush our teeth.</p>'
        />
        <ImagePlaceholder width={500} height={400} />
        <ImagePlaceholder width={500} height={400} />
    </div>

    <div slot="right">
        <p class="no-top-margin">Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the </p>
        <p class="no-top-margin">Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <!-- <ImageWrapper {imageUrl} fixedWidth = 1000 mode="fixed" />  -->
        <MultipleChoice {options} />
    </div>
</TwoPanelLayout>

<style>
    .no-top-margin:first-of-type {
        margin-top: 0;
    }
   
</style>