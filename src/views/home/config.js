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

const columns = columnsName.map((v) => {
  return {
    title: v,
    rowKey: v,
    dataIndex: v,
    slots: {
      customRender: v
    }
  }
})

columns.push({
  title: 'operation',
  dataIndex: 'operation',
  slots: {
    customRender: 'operation'
  }
})

export { columns, columnsName }
