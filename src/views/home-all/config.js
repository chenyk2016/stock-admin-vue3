// "code": "",
// "short_name": "中国联通",
// "add_price": "4.18",
// "add_pe": "",
// "current_situation": "ROE持续回升 3%。\n营业收入稳定，净利润增加10%。",
// "support_point": "5G发展\n物联网，大数据的发展",
// "value_grade": "3",
// "buy_grade": "3",
// "price_around": "4-10",
// "trades": "通讯",
// "main_business": "",
// "main_customer": "",
// "group_id": "大盘",
// "create_dt": "2021-07-25 00:00:00",
// "update_dt": "2021-07-26 00:00:00"

const columnsName = [
  'code',
  'short_name',
  'add_price',
  'add_pe',
  'current_situation',
  'support_point',
  'value_grade',
  'buy_grade',
  'price_around',
  'trades',
  'main_business',
  'main_customer',
  'group_id',
  'create_dt',
  'update_dt'
]

const columnsNameMore = [
  'current_situation',
  'support_point',
  'value_grade',
  'buy_grade',
  'price_around',
  'trades'
]

const extColumnsConf = {
  current_situation: {
    type: 'textarea',
    width: '200px'
  },
  support_point: {
    type: 'textarea',
    width: '200px'
  },
  buy_grade: {
    sorter: (a, b) => a.buy_grade - b.buy_grade
    // defaultSortOrder: 'descend',
  },
  value_grade: {
    sorter: (a, b) => a.value_grade - b.value_grade
    // defaultSortOrder: 'descend',
  }
}

const columns = columnsName.map((v) => {
  const obj = extColumnsConf[v] || {}

  return {
    ...obj,
    title: v,
    rowKey: v,
    dataIndex: v,
    slots: {
      customRender: v
    }
  }
})

const columnsConf = columns.reduce((obj, v) => {
  obj[v.rowKey] = v
  return obj
}, {})

columns.push({
  title: 'operation',
  dataIndex: 'operation',
  slots: {
    customRender: 'operation'
  },
  fixed: 'right'
})

function createRules (columnsName, extConf) {
  return columnsName.map((v) => {
    const obj = extConf[v] || {}

    return {
      ...obj,
      type: obj.type ? `a-${obj.type}` : 'a-input', // 类型， 必填
      title: v, // 名称， 必填
      field: v, // 字段id，必填
      validate: [ // 验证规则
      ],
      props: { // 传递给表单组件的属性
        placeholder: '请输入',
        style: {
        }
      }
    }
  })
}

const formRules = createRules(columnsName, extColumnsConf)
const formRulesMore = createRules(columnsNameMore, extColumnsConf)

export { columns, columnsName, columnsConf, formRules, formRulesMore }
