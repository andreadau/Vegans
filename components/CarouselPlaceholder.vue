<template>
  <div class="carousel-placeholder-slide">
    <div class="slide-body">
      <div class="slide-wrapper">
        <div class="slide-image-container" :style="{ backgroundColor: currentSlide.centerDivBgColor }">
          <div class="logo-area">
            <h1 class="logo-main">{{ currentSlide.logoMainText }}</h1>
            <p class="logo-byline">{{ currentSlide.logoBylineText }}</p>
          </div>
          <div class="wavy-bg" :style="currentSlide.wavyBgStyle"></div>
        </div>

        <div class="caption caption-bottom-right">
          <span class="caption-text">{{ currentSlide.bottomRightCaption1 }}</span>
          <span class="caption-text">{{ currentSlide.bottomRightCaption2 }}</span>
        </div>
      </div>
    </div>

    <div class="carousel-navigation">
      <button @click="prevSlide" :disabled="currentIndex === 0" class="nav-arrow">&lt;</button>
      <span class="nav-text">
        {{ String(currentIndex + 1).padStart(2, '0') }} — {{ String(slides.length).padStart(2, '0') }}
      </span>
      <button @click="nextSlide" :disabled="currentIndex === slides.length - 1" class="nav-arrow">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const slides = ref([
  {
    id: 1,
    centerDivBgColor: '#FFFFFF',
    wavyBgStyle: {
      background: `
        radial-gradient(circle at 15% 25%, #FFA500 0%, #FFC500 12%, transparent 35%),
        radial-gradient(ellipse at 90% 35%, #1E90FF 0%, #00BFFF 15%, transparent 45%),
        radial-gradient(circle at 20% 85%, #DA70D6 0%, #B070DA 15%, transparent 40%)
      `,
    },
    topLeftCaption: 'buddybank',
    logoMainText: 'buddybank',
    logoBylineText: 'by UniCredit',
    bottomRightCaption1: "WORLD'S FIRST CONVERSATIONAL", // Updated to match image
    bottomRightCaption2: 'BANKING EXPERIENCE',      // Updated to match image
  },
  {
    id: 2,
    centerDivBgColor: '#f0f8ff',
    wavyBgStyle: {
      background: `
        radial-gradient(circle at 20% 30%, #FF6347 0%, #FF7F50 12%, transparent 40%),
        radial-gradient(ellipse at 80% 40%, #3CB371 0%, #2E8B57 15%, transparent 50%),
        radial-gradient(circle at 25% 80%, #BA55D3 0%, #9932CC 15%, transparent 45%)
      `,
    },
    topLeftCaption: 'Slide Two',
    logoMainText: 'Innovation Hub',
    logoBylineText: 'Future Forward',
    bottomRightCaption1: 'SEAMLESS INTEGRATION',
    bottomRightCaption2: 'USER EXPERIENCE',
  },
  {
    id: 3,
    centerDivBgColor: '#fffacd',
    wavyBgStyle: {
      background: `
        radial-gradient(circle at 10% 20%, #ADFF2F 0%, #7FFF00 12%, transparent 38%),
        radial-gradient(ellipse at 85% 30%, #FFD700 0%, #FFA500 15%, transparent 48%),
        radial-gradient(circle at 15% 75%, #6A5ACD 0%, #483D8B 15%, transparent 42%)
      `,
    },
    topLeftCaption: 'View Three',
    logoMainText: 'Service X',
    logoBylineText: 'Powered by AI',
    bottomRightCaption1: 'DATA-DRIVEN INSIGHTS',
    bottomRightCaption2: 'ALWAYS LEARNING',
  },
  {
    id: 4,
    centerDivBgColor: '#e6e6fa',
    wavyBgStyle: {
      background: `
        radial-gradient(circle at 22% 33%, #FF4500 0%, #FF6347 12%, transparent 37%),
        radial-gradient(ellipse at 78% 38%, #20B2AA 0%, #48D1CC 15%, transparent 47%),
        radial-gradient(circle at 28% 82%, #C71585 0%, #DB7093 15%, transparent 41%)
      `,
    },
    topLeftCaption: 'Project Alpha',
    logoMainText: 'Alpha Core',
    logoBylineText: 'Next Generation',
    bottomRightCaption1: 'ROBUST & SCALABLE',
    bottomRightCaption2: 'ENTERPRISE READY',
  },
  {
    id: 5,
    centerDivBgColor: '#faf0e6',
    wavyBgStyle: {
      background: `
        radial-gradient(circle at 18% 28%, #D2691E 0%, #CD853F 12%, transparent 36%),
        radial-gradient(ellipse at 88% 36%, #5F9EA0 0%, #4682B4 15%, transparent 46%),
        radial-gradient(circle at 22% 88%, #FF1493 0%, #FF69B4 15%, transparent 39%)
      `,
    },
    topLeftCaption: 'Beta Launch',
    logoMainText: 'Beta Platform',
    logoBylineText: 'Early Access',
    bottomRightCaption1: 'CUTTING-EDGE TECH',
    bottomRightCaption2: 'JOIN THE REVOLUTION',
  },
  {
    id: 6,
    centerDivBgColor: '#f5f5f5',
    wavyBgStyle: {
      background: `
        radial-gradient(circle at 12% 22%, #7B68EE 0%, #9370DB 12%, transparent 39%),
        radial-gradient(ellipse at 92% 32%, #32CD32 0%, #00FA9A 15%, transparent 49%),
        radial-gradient(circle at 17% 82%, #FF8C00 0%, #FFA500 15%, transparent 43%)
      `,
    },
    topLeftCaption: 'Final Stage',
    logoMainText: 'Omega Suite',
    logoBylineText: 'Fully Featured',
    bottomRightCaption1: 'PREMIUM SUPPORT',
    bottomRightCaption2: '24/7 AVAILABILITY',
  },
]);

const currentIndex = ref(0);

const currentSlide = computed(() => {
  return slides.value[currentIndex.value];
});

const nextSlide = () => {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

</script>

<style scoped lang="scss">
.carousel-placeholder-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 30px;
}

.slide-body {
  margin-bottom: 20px;
}

.slide-image-container {
  position: relative;
  width: clamp(320px, 60vw, 620px);
  height: clamp(180px, 30vw, 390px);
  border-radius: 8px;
  overflow: hidden;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  transition: background-color 0.5s ease;
}

.wavy-bg {
  position: absolute;
  inset: -35px;
  background:
    radial-gradient(circle at 15% 25%, #FFA500 0%, #FFC500 12%, transparent 35%),
    radial-gradient(ellipse at 90% 35%, #1E90FF 0%, #00BFFF 15%, transparent 45%),
    radial-gradient(circle at 20% 85%, #DA70D6 0%, #B070DA 15%, transparent 40%);
  filter: blur(22px);
  z-index: 0;
  transform: scale(1.2);
  opacity: 0.95;
  transition: background 0.7s ease-in-out;
}

.logo-area {
  color: #000;
  z-index: 4;
}

.logo-main {
  margin-bottom: 2px;
}
.logo-byline {
  font-size: 0.9em;
  color: #333;
}

.slide-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
}

.caption {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 8px; // This will create space between the two lines of text if they are separate spans

  .caption-text {
    font-size: clamp(0.8rem, 1.6vw, 1rem); // Adjusted to be more prominent like the image
    font-weight: bold; // Bolder text as in the image
    font-family: serif; // The font in the image looks like a serif font (e.g., Times New Roman, Georgia)
    padding: 8px 12px; // Adjust padding to get the desired rectangle size
    border-radius: 0px; // Sharp corners for the rectangle
    background: #000000; // Black background for the rectangle
    color: #FFFFFF;     // White text color
    pointer-events: none;
    display: inline-block; // Ensures background wraps only the text content
    line-height: 1.2; // Adjust line-height if text wraps within a single span
    text-transform: uppercase; // Text in image is uppercase
  }
}

.caption-top-left {
  top: 20px;
  left: -70px; // Adjusted
  align-items: flex-start;
   // If top-left should have a different style, you can add specific rules here:
  .caption-text {
    background: none; // Example: revert to no background for top-left
    color: black;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; // Revert font
    text-transform: none; // Revert case
    font-weight: 600;
    padding: 6px 12px;
    text-shadow: 0 0 2px rgba(255,255,255,0.7);
  }
}

.caption-bottom-right {
  bottom: 30px; // Adjusted for better visual balance
  right: -80px;  // Adjusted
  align-items: flex-end; // Ensures multi-line texts align to the right
}

.carousel-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
}

.nav-arrow {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #555;
  padding: 0 10px;
  line-height: 1;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: #000;
  }
}

.nav-text {
  font-size: 1.2rem;
  font-weight: 500;
  min-width: 70px;
  text-align: center;
  letter-spacing: 1px;

  .current-page { // Assuming you might implement the two-span solution later
    color: #000000;
  }
  .total-pages { // Assuming you might implement the two-span solution later
     color: #777777;
  }
}
</style>