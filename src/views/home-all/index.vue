<template>
  <div class="home-page">
    <div class="header">
      <span>全部关注</span>
      <AddButton class="add-btn" @on-success="getList" />
    </div>
    <div class="group">
      <div>
        <a-table
          rowKey="code"
          :columns="columns"
          :data-source="groupData"
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
              <template v-if="col === 'code'">
                <router-link :to="`https://xueqiu.com/S/${test}`" target="_blank"></router-link>
              </template>
              <template v-if="col === 'short_name'">
                <div>
                  <MoreInfo :data="record">
                    {{ text }}
                  </MoreInfo>
                </div>
              </template>
              <template v-else>
                {{ text }}
              </template>
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
import AddButton from './add-button'
import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { columns, columnsName, columnsConf } from './config'
import MoreInfo from './more-info'

export default {
  name: 'Home',
  components: {
    AddButton, MoreInfo
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
    groupId () {
      return this.$route.params && this.$route.params.id
    }
  },
  watch: {
    groupId: {
      handler () {
        this.getList()
      },
      immediate: true
    }
  },
  created () {
  },
  methods: {
    getList () {
      const groupId = this.groupId
      if (groupId) {
        this.getQueryData()
      } else {
        this.getData(groupId)
      };
    },
    getData () {
      window.$request.get('/self/all').then(res => {
        this.groupData = res.data
      })
    },
    getQueryData () {
      // const groupId = this.groupId
      window.$request.get('/self/ST').then(res => {
        this.groupData = res.data
      })
    },
    edit (key, record) {
      this.editableData[key] = cloneDeep(record)
    },
    save (key, record) {
      const data = Object.assign(record, this.editableData[key])

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
.header{
  position: relative;
  height: 40px;
}
.add-btn{
  position: absolute;
  top: 0;
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
