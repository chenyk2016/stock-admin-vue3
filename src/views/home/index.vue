<template>
  <div class="home">
    <div class="group" v-for="(item, idx) in groupData" :key="`group_${idx}`">
      <div class="group-name">{{ item.name }}</div>

      <a-table
        :columns="columns"
        :data-source="item.children"
        bordered
        :pagination="false">
        <template v-for="col in editColumns" #[col]="{ text,record }" :key="`group_${idx}_${col}`">
          <div>
            <a-input
              v-if="editableData[record.short_name]"
              v-model:value="editableData[record.short_name][col]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations" :key="`group_${idx}_operation`">
            <span v-if="editableData[record.short_name]">
              <a @click="save(record.short_name, record)">Save</a>
              <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.short_name, record)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.short_name, record)">Edit</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { columns, columnsName } from './config'

console.log(columns)
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      groupData: [],
      columns,
      editColumns: columnsName,
      editableData: reactive({})
    }
  },
  computed: {
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      window.$request.get('/self/group').then(res => {
        this.groupData = res.data
        console.log(res.data)
      })
    },
    edit (key, record) {
      this.editableData[key] = cloneDeep(record)
    },
    save (key, record) {
      Object.assign(record, this.editableData[key])
      delete this.editableData[key]
    },
    cancel (key, record) {
      delete this.editableData[key]
    }
  }
}
</script>

<style >
.group-name{
  padding: 10px 0;
  font-size: 16px;
}
.ant-table-wrapper{
  overflow: auto;
}
</style>
