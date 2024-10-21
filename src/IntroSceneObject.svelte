<script>
    import CharacterScene from './CharacterScene.svelte';
    import msNassar from '../public/msNassar.svg';
    import Tara_Left from '../public/Tara_Left_Standing.svg';

    export let backgroundImageUrl = "DSC9369EditEditsharpenedjpg.webp";

    const leftSpeechBubbleParagraphs = [
        "What a beautiful forest! Probably too much undergrowth for archeology...",
        "lorem ipsum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
    ];

    const rightSpeechBubbleParagraphs = [
        "Another speech bubble fo testing. Tara has two paragraphs, this will surely ruin our spacing!",
        "It should be positioned below the first one."
    ];
</script>

<CharacterScene
{backgroundImageUrl}
    leftAvatarImage={msNassar}
    rightAvatarImage={Tara_Left}
    leftSpeechBubbleTitle="Dr. Nassar"
    leftSpeechBubbleParagraphs={leftSpeechBubbleParagraphs}
    rightSpeechBubbleTitle="Tara"
    rightSpeechBubbleParagraphs={rightSpeechBubbleParagraphs}
    showLeftAvatar={true}
    showRightAvatar={false}
    showLeftSpeechBubble={true}
    showRightSpeechBubble={false}
    showRightImage={true}
    rightImage="introMap.png"
/>