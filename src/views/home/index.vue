<template>
  <div class="home-page">
    <AddButton class="add-btn" />
    <div class="group" v-for="(item, idx) in groupData" :key="`group_${idx}`">
      <div class="group-name">{{ item.group_id }}</div>
      <div>
        <a-table
          rowKey="code"
          :columns="columns"
          :data-source="item.data"
          bordered
          :pagination="false">
          <template v-for="col in editColumns" #[col]="{ text,record }" :key="`group_${idx}_${col}`">
            <div v-if="editableData[record.short_name]">
              <a-textarea
                v-if="columnsConf[col].type === 'textarea'"
                v-model:value="editableData[record.short_name][col]"
              />
              <a-input
                v-else
                v-model:value="editableData[record.short_name][col]"
                style="margin: -5px 0"
              />
            </div>
            <template v-else>
                {{ text }}
              </template>
          </template>
          <template #operation="{ record }">
            <div class="editable-row-operations" :key="`group_${idx}_operation`">
              <span v-if="editableData[record.short_name]">
                <p>
                  <a @click="save(record.short_name, record)">Save</a>
                </p>
                <p>
                  <a @click="cancel(record.short_name, record)">Cancel</a>
                </p>
                <!-- <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.short_name, record)">
                  <a >Cancel</a>
                </a-popconfirm> -->
              </span>
              <span v-else>
                <a @click="edit(record.short_name, record)">Edit</a>
              </span>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import AddButton from '../home-all/add-button'
import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { columns, columnsName, columnsConf } from '../home-all/config'

export default {
  name: 'Home',
  components: {
    AddButton
  },
  data () {
    return {
      groupData: [],
      columns,
      editColumns: columnsName,
      editableData: reactive({}),
      columnsConf
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
      })
    },
    edit (key, record) {
      this.editableData[key] = cloneDeep(record)
    },
    save (key, record) {
      const data = Object.assign(record, this.editableData[key])
      console.log(data)

      window.$request.post('/self/group', data).then(res => {
        this.$message.success('提交成功')
        delete this.editableData[key]
      })
    },
    cancel (key, record) {
      delete this.editableData[key]
    }
  }
}
</script>

<style >
.home-page{
  position: relative;
}
.add-btn{
  position: absolute;
  top: 10px;
  right: 10px;
}
.group-name{
  padding: 10px 0;
  font-size: 16px;
}
.ant-table-wrapper{
  overflow: auto;
}
.ant-table-scroll{
  overflow: auto;
}

</style>
