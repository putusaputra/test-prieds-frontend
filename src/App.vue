<script setup>
import { RouterLink, RouterView } from "vue-router";
import HomeNavigation from "./components/HomeNavigation.vue";
</script>

<template>
  <header>
    <div class="wrapper">

      <HomeNavigation>
        <template #links>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </li>
           <li>
            <RouterLink to="/save-visitor" class="nav-link">Save Visitor</RouterLink>
          </li>
           <li>
            <RouterLink to="/print-queue" class="nav-link">Print Queue</RouterLink>
          </li>
        </template>

        <template #links-dropdown>
          <li>
            <RouterLink to="/list-visitor" class="dropdown-item">List Visitor</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/print-queue" class="dropdown-item">Print Queue</RouterLink
            >
          </li>
        </template>
      </HomeNavigation>
    </div>
  </header>

  <RouterView />
</template>
