<template>
  <div class="home">
    <div class="group" v-for="(item, idx) in group" :key="`group_${idx}`">
      <div class="group-name">{{ item.name }}</div>
      <a-table :columns="columns" :data-source="item.data" bordered>
        <template v-for="col in ['name', 'age', 'address']" #[col]="{ text, record }" :key="col">
          <div>
            <a-input
              v-if="item.data[record.key]"
              v-model:value="item.data[record.key][col]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      group: [
        {
          name: '1组',
          data: []
        },
        {
          name: '2组',
          data: []
        }
      ],
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '股票名称',
          key: 'name'
        }

      ]
    }
  }
}
</script>
