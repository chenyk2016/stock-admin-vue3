<template>
  <table>
    <thead>
      <tr>
        <th v-for="(item, idx) in data" :key="`item.${idx}`">
          {{ item.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in data" :key="`item.${idx}`">
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          a: 1,
          b: 2
        }
      ],
      columns: [
        {
          title: '12',
          key: '22'
        },
        {
          title: '12',
          key: '2223'
        }
      ]
    }
  }
}
</script>

<style>

</style>
