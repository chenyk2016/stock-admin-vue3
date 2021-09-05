<template>
  <div class="top-menu">
    <a-menu mode="vertical">
      <a-menu-item v-for="item in routes" :key="item.path" >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data: () => ({
    routes: [
      {
        path: '/all',
        name: 'all'
      },
      {
        path: '/group',
        name: 'group'
      },
      {
        path: '/group/ST',
        name: 'ST'
      }
    ]
  })
}
</script>

<style>

</style>
