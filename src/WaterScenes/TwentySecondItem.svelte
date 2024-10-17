<script>
    import TwoPanelLayout from '../TwoPanelLayout.svelte';
    import Avatar from '../Avatar.svelte';
    import MultipleChoice from '../MultipleChoice.svelte';
    import Submit from '../Submit.svelte';
    import BannerImage from '../BannerImage.svelte'; // Import the BannerImage component
    import ContainerComponent from '../ContainerComponent.svelte'; // Import the ContainerComponent
    import ImageWrapper from '../ImageWrapper.svelte'; // Import the ImageWrapper component
    import TextInputBox from '../TextInputBox.svelte'; 

    const bannerImagePath = 'border_waterdrop-full.png'; // Specify the path to your banner image

    let inputValue = '';

    const options = [
        { text: '10', color: '#ff0000' },
        { text: '20', color: '#00ff00' },
        { text: '20', color: '#00ff00' },
        { text: '20', color: '#00ff00' }
    ];

        // MathML content for the expression
        const mathML = `
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mrow>
                <mn>34</mn>
                <mo>+</mo>
                <mn>454</mn>
                <mo>+</mo>
                <mn>2,000</mn>
                <mo>+</mo>
                <mn>1,345</mn>
                 <mo>+</mo>
                <mn>2,000</mn>
                <mo>+</mo>
                <mn>1,345</mn>
                 <mo>+</mo>
                <mn>2,000</mn>
                <mo>+</mo>
                <mn>1,345</mn>
            </mrow>
        </math>
    `;


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
    text='<p style="margin-top:0;">I wonder how much water a person would use if the water is left on for only 20 seconds rather than 56 seconds while brushing teeth.</p><p>We can use the expression on the poster to find out.</p>'
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
        <p class="no-top-margin">Lorem Ipsum is simply dummy text of the. </p>
        <ImageWrapper contentType="mathml" mathMLContent={mathML} fixedWidth = 500 mode="fixed" />
        <p>Lorem Ipsum is simply dummy text of the printing Lorem. </p>
        <TextInputBox 
             leadingText=""
              followingText="units"
              bind:value={inputValue}
        />
        <Submit/>
    </div>
</TwoPanelLayout>

<style>
    .no-top-margin:first-of-type {
        margin-top: 0;
    }
    
</style>