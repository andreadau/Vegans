<template>
    <section class="contact-section">
        <div class="contact-main-content">
            <h2 class="main-cta-line1">We'd love to hear</h2>
            <h3 class="main-cta-line2">from you</h3>
            <NuxtLink to="/contact-us" class="get-in-touch-button">GET IN TOUCH</NuxtLink>
        </div>

        <div class="contact-bottom-bar">
            <div class="bottom-links">
                <a href="#privacy">PRIVACY POLICY</a>
                <a href="#cookie">COOKIE POLICY</a>
            </div>
            <div class="social-icon">
                <a href="#linkedin" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                </a>
            </div>
            <div class="bottom-info">
                <span>© {{ currentYear }} VEGAN SOLUTIONS</span>
                <span class="separator">|</span>
                <span>VAT IT03192340242</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped lang="scss">
.contact-section {
    background-color: #121212; // Or #000000 if it's pure black
    color: #e0e0e0; // Light gray/off-white for text
    min-height: 100vh; // Makes the section take at least the full viewport height
    padding: 2rem 3rem; // Overall padding
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-family: "PPNeueMontreal", sans-serif; // Default sans-serif for this section
}

.contact-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 2rem; // Space below top bar

    .logo-text {
        font-size: 1.5rem; // Adjust as needed
        font-weight: 500; // Medium weight
    }

    .symbol-text {
        font-size: 1.7rem; // Match navbar symbol if desired
    }
}

.contact-main-content {
    flex-grow: 1; // Pushes the bottom bar down
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 0; // Vertical padding for the main content area

    .main-cta-line1 {
        font-family: "PPNeueMontreal", sans-serif; // Assuming a clean sans-serif
        font-size: clamp(2.5rem, 6vw, 4rem); // Responsive font size
        font-weight: 300; // Lighter weight
        color: #cccccc; // Slightly dimmer white
        margin: 0 0 0.25em 0; // Space below
        line-height: 1.2;
    }

    .main-cta-line2 {
        font-family: "EditorialNew", serif; // Prominent serif font
        font-size: clamp(4rem, 10vw, 7rem); // Larger responsive font size
        font-weight: normal; // Or a specific weight if EditorialNew has options
        color: #ffffff; // Bright white
        margin: 0 0 0.75em 0; // Space below
        line-height: 1.1;
    }

    .get-in-touch-button {
        font-family: "PPNeueMontreal", sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #e0e0e0;
        background: none;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        padding: 0.5em 0.2em; // Adjust padding for underline spacing
        cursor: pointer;
        transition: color 0.3s ease, border-color 0.3s ease;

        &:hover {
            color: #ffffff;
            border-color: #ffffff;
        }
    }
}

.contact-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 2rem; // Space above bottom bar
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #a0a0a0; // Dimmer color for footer info

    .bottom-links {
        display: flex;
        gap: 1.5rem; // Space between links

        a {
            color: inherit;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
                color: #e0e0e0;
            }
        }
    }

    .social-icon {
        a {
            color: #a0a0a0;
            display: inline-block;
            transition: color 0.3s ease;

            &:hover {
                color: #e0e0e0;
            }
        }

        svg {
            width: 20px; // Adjust icon size
            height: 20px;
            vertical-align: middle;
        }
    }

    .bottom-info {
        display: flex;
        gap: 0.5rem; // Space between info parts
        align-items: center; // Vertically align items like the separator

        .separator {
            margin: 0 0.5rem;
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .contact-section {
        padding: 1.5rem;
    }

    .contact-top-bar {
        .logo-text {
            font-size: 1.2rem;
        }

        .symbol-text {
            font-size: 1.5rem;
        }
    }

    .contact-main-content {
        .main-cta-line1 {
            font-size: clamp(2rem, 5vw, 3rem);
        }

        .main-cta-line2 {
            font-size: clamp(3rem, 8vw, 5.5rem);
        }

        .get-in-touch-button {
            font-size: 0.8rem;
        }
    }

    .contact-bottom-bar {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        padding-top: 1.5rem;
        font-size: 0.7rem;

        .bottom-links,
        .bottom-info {
            flex-direction: column;
            gap: 0.75rem;
        }

        .bottom-info .separator {
            display: none; // Hide separator on small screens if stacking
        }
    }
}
</style>