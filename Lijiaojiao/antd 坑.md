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
 补充一个例子：table 里面有个switch ，BUG问题是使用mock 假数据，假数据状态是开切换了变成关之后，
   刷新table 获取假数据状态应该是开，但是并不是假数据的状态
   问题有两个：1。table的使用的是不变的做标记，index不可以，使用的是recode.id+record+status
    2.父级是table，子集switch，改变子集的状态并没有传给父亲，当父亲两次给的都是开，子集就默认没有刷新，应该把子集的状态传到父级
 ```
   /*
    * 更新table source 中对应id 的上班状态
    */
   updateUserSysStatus = (id='', userSysStatus='') => {
        let tableData = Object.assign({}, this.props.tableData)
        let dataSource = tableData.dataSource || [];
        dataSource.map(item => {
            if(item.id === id) {
                item.userSysStatus = userSysStatus;
            }
            return item;
        })
        this.props.updateLocalData(dataSource)
    }
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

