<template>
  <div class="top-menu">
    <div v-for="item in routes" :key="item.path">
      {{ item.name }}
    </div>
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
