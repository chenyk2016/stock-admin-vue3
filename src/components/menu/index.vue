<template>
  <div class="top-menu">
    <a-menu mode="vertical">
      <a-menu-item v-for="item in routes" :key="item.path" >
        <router-link :to="item.path">{{ item.path }}</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { routes } from '@/router'

export default {
  name: 'menu',
  data: () => ({
    routes
  })
}
</script>

<style>

</style>
