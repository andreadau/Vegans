<template>
  <header class="navbar">
    <NuxtLink to="/" aria-label="Go to homepage">
      <img :src="logo" alt="Logo" class="logo-img" />
    </NuxtLink>
    <div class="symbol">//</div>
    </header>
</template>

<script setup>
import logo from '~/assets/img/logo.svg';
</script>

<style scoped lang="scss">
/* Styles specific to the Navbar component */
.navbar {
  position: sticky;
  top: 0;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content if overlapping */
  background: transparent; 

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
}

.logo-img {
  height: 25px;
  display: block; /* Helps prevent extra space below the image */

  @media (max-width: 768px) {
    height: 22px;
  }
}

.symbol {
  font-size: 1.7rem;
  color: #333; /* Adjust color as needed */

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

</style>