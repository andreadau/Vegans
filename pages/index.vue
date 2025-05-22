<template>
  <div class="page-wrapper">
    <Navbar />

    <div class="hero-text-wrapper" ref="heroTextWrapperRef">
      <h1 class="hero-text">
        <span class="light-text">We transform</span>
        <span class="light-text">your vision into a</span>
        <span class="highlight">Digital Masterpiece.</span>
      </h1>
    </div>

    <section class="main-transition-section" ref="mainTransitionSectionRef">
      <div class="video-overlay" ref="videoOverlayRef"></div>
      <video class="shared-background-video" ref="sharedBgVideoRef" muted loop playsinline preload="auto">
        <source :src="crystalVideoSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <EvolvingPanel ref="evolvingPanelComponentRef" />
    </section>

    <section class="contact-section">
      <ContactSection />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import crystalVideoSrc from '~/assets/video/crystal_animation.mp4'; // Using ~ alias
// Nuxt 3 can auto-import components from the '~/components' directory
// So, explicit imports for Navbar, EvolvingPanel, and ContactSection might not be needed
// if they are in the root of the components folder and named correctly (e.g., Navbar.vue).
// However, explicit imports are also fine.
import Navbar from '~/components/Navbar.vue';
import EvolvingPanel from '~/components/EvolvingPanel.vue'; // Using ~ alias
import ContactSection from '~/components/ContactSection.vue'; // Using ~ alias

gsap.registerPlugin(ScrollTrigger);

const mainTransitionSectionRef = ref(null);
const sharedBgVideoRef = ref(null);
const heroTextWrapperRef = ref(null);
const evolvingPanelComponentRef = ref(null);
const videoOverlayRef = ref(null);

let mainTl = null;

onMounted(async () => {
  // Kill previous ScrollTriggers and timelines
  ScrollTrigger.getAll().forEach(st => st.kill());
  if (mainTl) {
    mainTl.kill();
    mainTl = null;
  }

  await nextTick(); // Wait for DOM updates

  const videoOverlayElement = videoOverlayRef.value;

  // Check if all critical refs for animation are available
  const refsAvailable = mainTransitionSectionRef.value && sharedBgVideoRef.value &&
    heroTextWrapperRef.value && evolvingPanelComponentRef.value &&
    evolvingPanelComponentRef.value.panelRootRef && // Ensure EvolvingPanel exposes panelRootRef
    videoOverlayElement;

  if (!refsAvailable) {
    console.warn("Index page: One or more critical refs are not available. Animations might not run correctly.");
    // Fallback to show the page if animations can't run
    if (document.querySelector(".page-wrapper")) {
        gsap.to(".page-wrapper", { opacity: 1, duration: 0.3, delay: 0.1 });
    }
    return;
  }

  const scroller = ".page-wrapper"; // Assuming .page-wrapper is the scroll container for this page
  const videoElement = sharedBgVideoRef.value;
  const heroTextSpans = heroTextWrapperRef.value.querySelectorAll('span');
  const panelRootEl = evolvingPanelComponentRef.value.panelRootRef;
  const initialTextEl = evolvingPanelComponentRef.value.initialTextContentElementRef;
  const carouselAreaEl = evolvingPanelComponentRef.value.carouselAreaElementRef;

  if (!panelRootEl || !initialTextEl || !carouselAreaEl) {
    console.error("Index page: Elements from EvolvingPanel component instance are missing!");
     if (document.querySelector(".page-wrapper")) {
        gsap.to(".page-wrapper", { opacity: 1, duration: 0.3, delay: 0.1 });
    }
    return;
  }

  videoElement.pause(); // Start with video paused

  // Initial GSAP states
  gsap.set(heroTextWrapperRef.value, { x: "-50%", y: "-50%", opacity: 1 });
  gsap.set(videoElement, { yPercent: 100, opacity: 1 });
  gsap.set(videoOverlayElement, { opacity: 0 });
  gsap.set(panelRootEl, { opacity: 0, x: 100 });
  gsap.set(carouselAreaEl, { autoAlpha: 0 });

  // Main GSAP timeline
  mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: mainTransitionSectionRef.value,
      scroller: scroller,
      start: "top top",
      end: "+=600%",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      markers: false // Set to true for debugging ScrollTrigger
    }
  });

  // --- Animation Stages ---
  mainTl.to(videoElement, {
    yPercent: 0, ease: "power1.out", duration: 1,
    onStart: () => { videoElement.currentTime = 0; videoElement.play().catch(err => console.warn("Video play error:", err)); }
  }, "stage1Start");
  mainTl.to(videoOverlayElement, { opacity: 1, ease: "power1.out", duration: 1 }, "stage1Start");
  mainTl.to(heroTextSpans, { color: "#FFFFFF", ease: "power1.inOut", duration: 1 }, "stage1Start");
  mainTl.to(heroTextWrapperRef.value, { opacity: 0, ease: "power1.inOut", duration: 0.5 }, "stage1Start+=0.5");
  mainTl.addLabel("heroTextGone", "stage1Start+=1.0");

  const panelRevealStartTime = "heroTextGone+=0.3";
  mainTl.to(panelRootEl, {
    opacity: 1, x: 0, backgroundColor: "rgba(20, 20, 20, 0.95)",
    width: "70vw", padding: "3rem 4rem", ease: "power2.out", duration: 1.0
  }, panelRevealStartTime);
  const panelReadyForTextLabel = `${panelRevealStartTime}+=1.0`;
  mainTl.addLabel("panelReadyForText", panelReadyForTextLabel);

  const initialTextFadeOutStartTime = "panelReadyForText+=1.2";
  mainTl.addLabel("initialTextFadeOutStart", initialTextFadeOutStartTime);
  mainTl.to(initialTextEl, { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, "initialTextFadeOutStart");
  mainTl.to(videoElement, { opacity: 0, duration: 1.0, ease: "power1.inOut" }, "initialTextFadeOutStart");
  mainTl.to(videoOverlayElement, { opacity: 0, duration: 1.0, ease: "power1.inOut" }, "initialTextFadeOutStart");
  mainTl.to(panelRootEl, {
    width: "80vw", height: "80vh", top: "50%", left: "50%", right: "auto",
    xPercent: -50, yPercent: -50, backgroundColor: "#EAEAEA", padding: "2rem",
    duration: 1.0, ease: "power3.inOut"
  }, "initialTextFadeOutStart+=0.3");
  mainTl.to(carouselAreaEl, { autoAlpha: 1, duration: 0.8, ease: "power1.out" }, "initialTextFadeOutStart+=0.7");

  // ScrollTrigger refresh listener
  const refreshListener = () => {
    if (heroTextWrapperRef.value) { // Ensure ref exists
        gsap.set(heroTextWrapperRef.value, { x: "-50%", y: "-50%" });
    }
  };
  ScrollTrigger.addEventListener("refresh", refreshListener);
  if (mainTl) { // Ensure mainTl exists before setting onKill
    mainTl.eventCallback("onKill", () => ScrollTrigger.removeEventListener("refresh", refreshListener));
  }


  // Asset readiness logic (fonts, video)
  let videoIsReady = false;
  let fontsAreReady = false;
  let pageShown = false;

  const finalizeAndShowPage = () => {
    if (videoIsReady && fontsAreReady && !pageShown) {
      pageShown = true;
      console.log("Index page: Assets ready, refreshing ScrollTrigger & showing page.");
      ScrollTrigger.refresh(true); // Refresh ScrollTrigger after assets are ready
      if (document.querySelector(".page-wrapper")) { // Check if .page-wrapper exists
        gsap.to(".page-wrapper", { opacity: 1, duration: 0.3, delay: 0.1 });
      }
    }
  };

  // Check font readiness
  try {
    await document.fonts.ready;
    fontsAreReady = true;
    console.log("Index page: Fonts ready.");
  } catch (e) {
    console.error("Index page: Font loading error or timeout:", e);
    fontsAreReady = true; // Proceed even if fonts error out to not block page load
  }
  finalizeAndShowPage();

  // Check video readiness
  if (videoElement && videoElement.readyState >= 4) { // HAVE_ENOUGH_DATA
    videoIsReady = true;
    console.log("Index page: Video ready (readyState).");
    finalizeAndShowPage();
  } else if (videoElement) {
    const onVidReady = () => {
      if (!videoIsReady) {
        videoIsReady = true;
        console.log("Index page: Video ready (event).");
        finalizeAndShowPage();
      }
    };
    videoElement.addEventListener('canplaythrough', onVidReady, { once: true });
    videoElement.addEventListener('loadeddata', onVidReady, { once: true }); // Fallback
    videoElement.addEventListener('error', (e) => {
      console.error("Index page: Video load error:", e);
      if (!videoIsReady) { // Ensure finalize is called even on error
        videoIsReady = true; // Consider it "ready" to unblock page
        finalizeAndShowPage();
      }
    }, { once: true });
  } else {
    videoIsReady = true; // No video element, so video is "ready"
    finalizeAndShowPage();
  }
});

onUnmounted(() => {
  if (mainTl) {
    mainTl.kill();
    mainTl = null;
  }
  // Also kill all ScrollTriggers created on this page to prevent memory leaks
  ScrollTrigger.getAll().forEach(st => st.kill());
  // Remove specific event listeners if any were added globally
});
</script>

<style lang="scss">
/*
  IMPORTANT: The non-scoped styles from pages/index.vue.
  The .navbar, .logo-img, .symbol styles have been MOVED to Navbar.vue and SCOPED.
  Only keep styles here that are truly specific to the layout of index.vue
  OR are intended to be global AND are not better placed in App.vue or a global CSS file.
*/

html,
body { /* These are often better in App.vue or a global CSS file */
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "PPNeueMontreal", sans-serif;
}

.page-wrapper {
  height: 100vh; /* Or min-height: 100vh; if content can exceed viewport */
  overflow-y: auto; /* Makes this the scroll container for GSAP if needed */
  overflow-x: hidden;
  position: relative; /* For positioning children like hero-text-wrapper */
  background: #e5e5e5; /* Default background for the page */
  opacity: 0; /* Initial state for fade-in animation */
}

/* Navbar styles are now in Navbar.vue and scoped. */
/* Do NOT redefine .navbar, .logo-img, .symbol here unless for very specific overrides. */

.hero-text-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%); GSAP handles this with xPercent/yPercent or x/y */
  width: min(90%, 1100px);
  text-align: center;
  z-index: 900; /* Ensure it's above video but below navbar if navbar is also fixed/sticky */
  pointer-events: none;
  will-change: opacity, color; /* Hint for browser optimization */

  .hero-text {
    font-size: clamp(3rem, 8vw, 6.3rem);
    margin: 0;
    line-height: 1.2;
    font-weight: 200; /* Light weight for PPNeueMontreal */
    color: #333; /* Initial color, GSAP will change it */

    .light-text {
      display: block;
    }

    .highlight {
      display: block;
      font-family: "EditorialNew", serif; /* Ensure this font is loaded */
      font-size: clamp(3.1rem, 8.2vw, 6.5rem); /* Slightly larger */
    }
  }
}

.main-transition-section {
  height: 100vh; /* Each major scroll section is a full viewport height */
  position: relative; /* For absolute positioning of video and overlay */
  overflow: hidden; /* Crucial for GSAP pinning context if elements inside are pinned */
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  z-index: 2; /* Above video, below text/panel if panel is on top */
  pointer-events: none; /* Allow clicks to pass through */
  opacity: 0; /* GSAP will animate this */
  will-change: opacity;
}

.shared-background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the entire area, may crop */
  z-index: 1; /* Behind overlay and other content */
  will-change: transform, opacity;
}
</style>