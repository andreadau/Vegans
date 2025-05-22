<template>
    <div class="evolving-panel-root" ref="panelRootRef">
        <div class="initial-text-content" ref="initialTextContentElementRef">
            <p>At vegan/s we offer more than just software solutions — We <strong>bring a unique blend of technical
                    mastery,</strong> innovative thinking, and premium design aesthetic <strong>to every
                    project.</strong></p>
            <p>By integrating seamlessly with your <strong>team, we make your mission our own, and</strong> work
                passionately to turn your <strong>dreams into reality.</strong></p>
            <p>With vegan/s, you're not getting a <strong>service provider, but a dedicated partner</strong> committed
                to turning your vision into a digital <strong>masterpiece.</strong></p>
        </div>

        <div class="vertical-text-column-left">
            <span class="vertical-text scroll-forth-and-back-down">
                DESIGN INNOVATION
            </span>
        </div>
        <div class="vertical-text-column-right">
            <span class="vertical-text scroll-forth-and-back-up">
                CHALLENGES EMBRACED
            </span>
        </div>

        <div class="carousel-area" ref="carouselAreaElementRef">
            <CarouselPlaceholder />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// Assuming CarouselPlaceholder.vue is in the same directory or path is adjusted
import CarouselPlaceholder from './CarouselPlaceholder.vue';

const panelRootRef = ref(null);
const initialTextContentElementRef = ref(null);
const carouselAreaElementRef = ref(null);

// Expose these DOM element refs to the parent component
defineExpose({
    panelRootRef,
    initialTextContentElementRef,
    carouselAreaElementRef
});
</script>

<style scoped lang="scss">
/* Import Prata font from Google Fonts.
   Prata typically only comes in a regular (400) weight.
   The browser will synthesize bold for <strong> tags if a true bold variant isn't available.
*/
@import url('https://fonts.googleapis.com/css2?family=Prata&display=swap');

.evolving-panel-root {
    position: absolute;
    top: 22%;
    left: 15%;
    width: clamp(280px, 40%, 500px);
    /* Keep its default initial width */
    opacity: 0;
    /* Start fully transparent; GSAP will handle visibility and positioning */

    color: white;
    z-index: 3;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    /* For child layout, this is fine */
    will-change: transform, opacity, background-color, width, height, padding, top, left, right;
}

.initial-text-content {
    flex-grow: 1; // Takes up available space before the vertical columns
    padding: 25px;
    box-sizing: border-box;
    font-family: "Prata", serif;
    /* Apply Prata font here */

    p {
        font-size: 1.1rem;
        /* Adjust if needed */
        line-height: 1.6;
        /* Adjust if needed */
        margin-bottom: 1.5rem;
        color: inherit;
        font-family: inherit;
        /* Inherits "Prata" from parent .initial-text-content */
        letter-spacing: 0.03em;
        /* Added for a slightly more airy feel */

        &:last-child {
            margin-bottom: 0;
        }

        // Styling for <strong> tags within these paragraphs
        // Using :deep() to ensure styles apply correctly in scoped CSS
        :deep(strong) {
            font-weight: bold; // Browser will use available bold or synthesize it
        }
    }
}

/* Base styles for vertical text columns */
.vertical-text-column-left,
.vertical-text-column-right {
    flex: 0 0 75px;
    /* Defines their width */
    /* background-color was removed */
    color: white;
    writing-mode: vertical-rl;
    /* Text flows top-to-bottom, lines right-to-left */
    overflow: hidden;
    /* Clips the animating text */
}

/* Specific alignment for the "DESIGN INNOVATION" column's text span */
.vertical-text-column-left {
    display: flex;
    justify-content: flex-start;
    /* Aligns span to top before animation */
    align-items: flex-end;
    /* Aligns span to the "left" side of its column */
}

/*
   The ".vertical-text-column-right" will have its text span aligned to the "right" (start)
   of its column by default due to writing-mode and display:block on the span.
   If specific alignment to its "left" (end) is needed, similar display:flex rules could be added.
*/

/* Shared styles for the text span within vertical columns */
.vertical-text {
    display: block;
    white-space: nowrap;
    font-family: 'Arial Narrow', 'Helvetica Neue', sans-serif;
    /* Font for vertical texts */
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.8rem;
    letter-spacing: 0.1em;
    will-change: transform;
    /* Performance hint for animation */

    &.scroll-forth-and-back-down {
        animation: animate-slide-down-forth-and-back 5s ease-in-out infinite alternate;
    }

    &.scroll-forth-and-back-up {
        animation: animate-slide-up-forth-and-back 5s ease-in-out infinite alternate;
    }
}

// Animation for text moving down, then reversing
@keyframes animate-slide-down-forth-and-back {
    0% {
        transform: translateY(0%); // Starts at its natural top position
    }

    100% {
        // Moves the text block down by 15% of its own height
        transform: translateY(15%);
    }
}

// Animation for text moving up, then reversing
@keyframes animate-slide-up-forth-and-back {
    0% {
        transform: translateY(0%); // Starts at its natural top position
    }

    100% {
        // Moves the text block up by 15% of its own height
        transform: translateY(-15%);
    }
}

.carousel-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e5e5e5;
    /* Placeholder background */
    /* GSAP likely handles its autoAlpha for fade in/out */
}
</style>