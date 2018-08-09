# 1.antd 问题

1. tag
  问题：删除tag时候，antd的删除不会删除数据，需要自己添加事件处理数据
  
  需注意事项：tag里面key值得设定要用唯一的值，不能是index，也不能是重复的汉字
  
2. tab 

  问题：切换的时候，默认值的选择必须是同步获取的插件，
  
  异步获取的不能当做默认值，加载时间内还没有进来，是null
  
3. table
  > table里面可以做一些操作，比如使用index表示编号
 ```
 {"title":"编号”,
 "dataIndex":"num”,
  render:(text,record,index)=> index+1}
 ```
 > table 里面对数据做操作，如时间戳转为日期格式
 ```
 {"title":"应还款日”,
 "dataIndex":"shouldRefundDate”,
  render:(text)=> moment(text).format('YYYY-MM-DD')}
 ```
 
 4.selection 
 BUG重现：selection中后台传的1，应该显示开启，但是未显示
 问题解决：类型错了，前端写的字符串，后台给的数字
 代码展示：
 ```
 const STATUS_MAP = [
    {
        'id': 1,
        'text': '开启'
    }, {
        'id': 2,
        'text': '关闭'
    }
]
<FormItem label={('自动分单')}>
                {getFieldDecorator('status', { initialValue: formData.status || ''})(
                <Select style={{width: 180}} >
                    {STATUS_MAP.map( (item) => (<Option value={item.id} key={item.id}>{item.text}</Option>) )}
                </Select>)}
            </FormItem>
 ```
 
# 2.react 中引入插件的话，首字母必须要大写

