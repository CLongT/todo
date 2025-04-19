<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="app-container">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/todo">TODO</RouterLink>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

header {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.logo {
  margin: 0 auto;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

nav a {
  padding: 0.5rem 1rem;
  border-left: 2px solid var(--color-border);
  border-bottom: none;
  text-align: left;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: var(--color-background-soft);
}

nav a.router-link-exact-active {
  color: var(--color-text);
  border-left-color: var(--color-text);
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow: auto;
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }

  header {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: 1rem;
  }

  nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  nav a {
    border-left: none;
    border-bottom: 2px solid var(--color-border);
  }

  nav a.router-link-exact-active {
    border-bottom-color: var(--color-text);
  }
}
</style>
