<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navigation">
        <h2>FactoryAdmin 1.0</h2>
        <div class="nav-button">
          <RouterLink to="/pipe-oil-flow">Manage pipe oil flow</RouterLink>
          <p>State</p>
          <p>Transition</p>
          <p>Atomic state</p>
          <p>Initial state</p>
          <p>Final state</p>
        </div>

        <div class="nav-button">
          <RouterLink to="/barrel-placement">Barrel placement</RouterLink>
          <p>Context</p>
          <p>Compound State</p>
          <p>Self Transition</p>
          <p>Entry & Exit actions</p>
        </div>

        <div class="nav-button">
          <RouterLink to="/fill-up-labeling">Barrel fill up and labeling</RouterLink>
          <p>Guard</p>
          <p>Delays</p>
          <p>Parallel State</p>
          <p>Always state</p>
          <p>Services</p>
        </div>

        <div class="nav-button">
          <RouterLink to="/multiple-flows">Multiple flows management</RouterLink>
          <p>Actors</p>
        </div>
      </nav>
    </div>
  </header>

  <div class="router">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.router {
  flex-basis: 75%;
  justify-content: center;
  align-content: center;
  margin: 1rem;
  display: flex;
  align-items: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header {
  display: flex;
  padding-right: calc(var(--section-gap) / 2);
  justify-content: stretch;
  flex: 1 1 30vw;
}


header .wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  flex-direction: column;
  flex: 1 1 100%;
}

nav {
  text-align: left;
  margin-left: -1rem;
  font-size: 1rem;

  background: #393939;
  flex-basis: 20%;
  height: auto;
  margin: 1rem;
  padding: 1rem;
}


.wrapper {
  display: flex;
}

h2 {
  color: white;
  font-weight: bold;
  font-family: monospace;
  margin: 0 0 1rem 0;
  padding-bottom: 4px;
  border-bottom: 2px solid #eee;
}


.nav-button {
  margin-bottom: 1rem;
}

.nav-button p {
  margin: 0.25rem 0 0 0.5rem;
  color: white;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
}

.nav-button p:first-of-type {
  margin-top: 0.5rem;
}

.nav-button a {
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  padding: 0.5rem 0.75rem;
  text-align: center;
  font-size: 13px;
  box-shadow: 0 3px 0 #a3a3a3;
}
</style>
