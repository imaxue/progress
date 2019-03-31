ElementUI 全选反选传值

最近一直在弄elementui三级联动复选框的功能,要求一级点击全选二级三级,二级点击全选三级,但是二级取消一级不受影响,三级全部取消,三级取消,二级和一级不受影响.(概括来说就是父级影响子集,子集不影响父级)

网上找参考了以下网址:

[](https://blog.csdn.net/qq_42578500/article/details/83035893#commentsedit)

但是demo里面,一级之一一个写死的不是遍历出来的,而且也没有传id的方法,在这里自己写了一下,需求也有小小的不同.

下面看小效果图

![1551689519976](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1551689519976.png)

数据为接口返回的真实数据.

下面看下我的代码:



html部分:

```html
<div class="deliverySetting-table" v-for="(one,oneIndex) in Mydata" :key="oneIndex">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                <div class="table-head">
                  <div class="selection">               <!--一级-->
                    <el-checkbox :key="one.id" :label="one.id" v-model="one.checked"
                                 @change="handleCheckAllChange(oneIndex,one,one.id,$event)">
                      {{ one.label }}
                    </el-checkbox>

                  </div>
                </div>
              </template>
              <div class="table-body" v-for="(two,twoIndex) in one.children" :key="two.id">
                <div class="selection">
                  <p>                                 <!--二级-->
                    <el-checkbox v-model="two.checked"
                                 @change="handleCheckedCountryAllChange(twoIndex,oneIndex,one.id,two,two.id,$event)"
                                 :label="two.id"
                                 :key="two.id">{{two.label}}
                    </el-checkbox>
                  </p>
                </div>
                <div class="width185"><p></p></div>
                <div class="width265">                <!--三级-->
                  <el-checkbox v-for="country in two.children" v-model="country.checked"
                               @change="handleCheckedCountryChange(oneIndex,twoIndex,one.id,two.id,country.id,$event)"
                               :label="country.id" :key="country.id">{{country.label}}
                  </el-checkbox>
                </div>
                <div>
                  <!--<p v-for="country in two.children" :key="index">
                    {{ country.label }}
                  </p>-->
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
```

js部分:

```js
 
 "Mydata": [
          {
            "id": 1,
            "label": "一级菜单(一)",
            "path": null,
            "pid": 0,
            "isGroup": 1,
            "icon": "el-icon-document",
            "value": "16926604699968512",
            "index": "b4caba5a05d64f2f8f94225795d2c0ce",
            "menuType": null,
            "checked": false,
            "isIndeterminate": false,
            "children": [
              {
                "label": "1区",
                "checked": false,
                "id": 11,
                "isIndeterminate": false,
                "children": [
                  {
                    "id": 111,
                    "label": "奥地利",
                    "fieldTableName": "奥地利",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": 222,
                    "label": "芬兰",
                    "fieldTableName": "芬兰",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": 333,
                    "label": "意大利",
                    "fieldTableNam": "意大利",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": 444,
                    "label": "葡萄牙",
                    "fieldTableName": "葡萄牙",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": 555,
                    "label": "西班牙",
                    "fieldTableName": "西班牙",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": 666,
                    "label": "瑞典",
                    "fieldTableName": "瑞典",
                    " distributors": "UPS",
                    "checked": false
                  }
                ]
              },
              {
                "label": "2区",
                "checked": false,
                "id": 22,
                "isIndeterminate": false,
                "children": [
                  {
                    "id": 777,
                    "label": "丹麦",
                    "fieldTableName": "单买",
                    "distributors": "",
                    "checked": false
                  },
                  {
                    "id": 888,
                    "label": "法国",
                    "fieldTableName": "法国",
                    "distributors": "",
                    "checked": false
                  }
                ]
              },
              {
                "label": "3区",
                "checked": false,
                "id": 33,
                "isIndeterminate": false,
                "children": [
                  {
                    "id": 999,
                    "label": "德国",
                    "fieldTableName": "德国",
                    "distributors": "YODEL",
                    "checked": false
                  },
                  {
                    "id": 1000,
                    "label": "瑞士",
                    "fieldTableName": "瑞士",
                    "distributors": "DPD",
                    "checked": false
                  }
                ]
              }
            ]
          },
          {
            "id": 2,
            "label": "一级菜单(二)",
            "path": null,
            "pid": 0,
            "isGroup": 2,
            "icon": "el-icon-document",
            "value": "16926604699968512",
            "index": "b4caba5a05d64f2f8f94225795d2c0ce",
            "menuType": null,
            "checked": true,
            "children": [
              {
                "label": "1区",
                "checked": true,
                "id": 44,
                "children": [
                  {
                    "id": "11111111111",
                    "label": "奥地利",
                    "fieldTableName": "奥地利",
                    "distributors": "UPS",
                    "checked": true
                  },
                  {
                    "id": "2",
                    "label": "芬兰",
                    "fieldTableName": "芬兰",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": "3",
                    "label": "意大利",
                    "fieldTableNam": "意大利",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": "4",
                    "label": "葡萄牙",
                    "fieldTableName": "葡萄牙",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": "9",
                    "label": "西班牙",
                    "fieldTableName": "西班牙",
                    "distributors": "UPS",
                    "checked": false
                  },
                  {
                    "id": "10",
                    "label": "瑞典",
                    "fieldTableName": "瑞典",
                    " distributors": "UPS",
                    "checked": false
                  }
                ]
              },
              {
                "label": "2区",
                "checked": false,
                "id": 55,
                "isIndeterminate": false,
                "children": [
                  {
                    "id": "5",
                    "label": "丹麦",
                    "fieldTableName": "单买",
                    "distributors": "",
                    "checked": false
                  },
                  {
                    "id": "6",
                    "label": "法国",
                    "fieldTableName": "法国",
                    "distributors": "",
                    "checked": false
                  }
                ]
              },
              {
                "label": "3区",
                "checked": false,
                "id": 66,
                "isIndeterminate": false,
                "children": [
                  {
                    "id": "7",
                    "label": "德国",
                    "fieldTableName": "德国",
                    "distributors": "YODEL",
                    "checked": false
                  },
                  {
                    "id": "8",
                    "label": "瑞士",
                    "fieldTableName": "瑞士",
                    "distributors": "DPD",
                    "checked": false
                  }
                ]
              }
            ]
          },

        ]
        
```

```
//一级change事件
      handleCheckAllChange(index, one, oneId, e) {//一级事件默认不传参的话,返回一个布尔值,true和false切换
        this.Mydata[index].checked = e
        if (e == true) {//如果一级全选
          // console.log(this.dataArr)//全部选中的id,留着保存的时候备用
          //this.Mydata[index].indeterminate = false //一级全选的不确定状态关闭
          if (this.Mydata[index].children) {
            for (var i = 0, len = this.Mydata[index].children.length; i < len; i++) { //循环二级,
              this.Mydata[index].children[i].checked = e
              //让二级的全选状态为等于e=true
              if (this.Mydata[index].children[i].children) {
                for (var j = 0, len1 = this.Mydata[index].children[i].children.length; j < len1; j++) { //循环三级
                  this.Mydata[index].children[i].children[j].checked = e                //让三级的全选状态为等于e=true
                }
              }

            }
          }


        } else {//如果一级没有全选
          //this.Mydata[index].indeterminate = false //一级全选的不确定状态关闭
          if (this.Mydata[index].children) {
            for (var i = 0, len = this.Mydata[index].children.length; i < len; i++) { //循环二级,
              this.Mydata[index].children[i].checked = e  //让二级的全选状态为等于e=false
              if (this.Mydata[index].children[i].children) {
                for (var j = 0, len1 = this.Mydata[index].children[i].children.length; j < len1; j++) {//循环三级,
                  this.Mydata[index].children[i].children[j].checked = e                  //让二级的全选状态为等于e=false
                }
              }
            }
          }


        }
      },

      //二级change事件
      handleCheckedCountryAllChange(towIndex, oneIndex, oneId, two, twoId, e) {
        //二级传了3个值
        // this.children[index].checked = e//二级勾选后，
        if(this.Mydata[oneIndex].children){
          this.Mydata[oneIndex].children[towIndex].checked = e//二级勾选后，
          //if (e == false) this.Mydata[oneIndex].children[towIndex].indeterminate = false //去掉二级不确定状态
        }

        var childrenArray = this.Mydata[oneIndex].children[towIndex].children
        if (childrenArray)
          for (var i = 0, len = childrenArray.length; i < len; i++)
            childrenArray[i].checked = e //三级全部勾选或者取消


        this.getIsCheckAll(oneIndex) //反判断一级是否全部选中
      },

      //三级change事件
      handleCheckedCountryChange(oneIndex, twoIndex, oneId, twoId, threeId, e) {
        //传了4个参数
        var childrenArray = this.Mydata[oneIndex].children[twoIndex].children //所有三级数据
        var tickCount = 0, unTickCount = 0, len = childrenArray.length
        if (childrenArray) {
          for (var i = 0; i < len; i++) { //循环所有三级
            if (threeId == childrenArray[i].id) childrenArray[i].checked = e //如果我当前点击的三级和循环到的三级的id匹配,当前的三级为选中状态
            if (childrenArray[i].checked == true) tickCount++              //如果当前循环到的三级是选中状态  tickCount++
            if (childrenArray[i].checked == false) unTickCount++           //如果当前循环到的三级是非选中状态 unTickCount++
          }
        }

        if (tickCount == len) {//三级级全勾选
          this.Mydata[oneIndex].children[twoIndex].checked = true       //三级对应的二级选中
          // this.Mydata[oneIndex].children[twoIndex].indeterminate = false //三级对应的二级不确定状态关闭

        } else if (unTickCount == len) {//三级级全不勾选
          this.Mydata[oneIndex].children[twoIndex].checked = true      //三级对应的二级不选中
          // this.Mydata[oneIndex].children[twoIndex].indeterminate = false //三级对应的二级不确定状态关闭
        } else {
          this.Mydata[oneIndex].children[twoIndex].checked = true
          //this.Mydata[oneIndex].children[twoIndex].indeterminate = false //添加二级不确定状态
        }

        this.getIsCheckAll(oneIndex)//反判断一级是否选中
      },

      //通过二级是否全选判断一级是否全选和不确定状态(二级反选一级)
      getIsCheckAll(oneIndex) {
        console.log(oneIndex)
        var tickCount = 0, unTickCount = 0, ArrLength = this.Mydata[oneIndex].children.length
        console.log(this.Mydata[oneIndex].children.length)
        if (ArrLength) {
          for (var j = 0; j < ArrLength; j++) {//全选checkbox状态 //循环所有二级
            if (this.Mydata[oneIndex].children[j].checked == true) tickCount++ //如果整个数组二级都选中  tickCount++
            if (this.Mydata[oneIndex].children[j].checked == false) unTickCount++ //如果整个数组二级都没有选中  unTickCount++
          }
        }

        if (tickCount == ArrLength) {//二级全勾选

          this.Mydata[oneIndex].checked = true //一级全选状态为true
          // this.Mydata[oneIndex].indeterminate = false //不确定状态关闭
        } else if (unTickCount == ArrLength) {//二级全不勾选

          this.Mydata[oneIndex].checked = true //一级全选状态为false
          //this.Mydata[oneIndex].indeterminate = false   //不确定状态关闭
        } else {
          this.Mydata[oneIndex].checked = true  //二级部分勾选
          //this.Mydata[oneIndex].indeterminate = false //添加一级不确定状态
        }
      },
```

传id的部分:

其实id传值的部分不难,但是之前一直想的是通过change事件每次获取到对应的id,这样取值就相当的麻烦,其实后来才发现这样太蠢了.下面的思路可以一次准确的获取对应的id:

获取数据全部选中状态对应的id,换言之遍历所有数据,如果对应的checked为true,就讲当前checked对应的id放进数组中

```
  /*获取全部选中id的方法*/
      getCheckedIds: function () {
        var dataArr = []
        var oneData = this.Mydata;

        if (oneData) {
          for (var i = 0; i < oneData.length; i++) {
            if (oneData[i].checked == true) {  //如果一级对应的是选中状态
              dataArr.push(this.Mydata[i].id);//把一级选中对应的id放进数组

              var twoData = oneData[i].children;
              if (twoData) {
                for (var j = 0; j < twoData.length; j++) {
                  if (twoData[j].checked == true) { //如果二级对应的是选中状态
                    dataArr.push(twoData[j].id);//把二级选中对应的id放进数组

                    var threeData = twoData[j].children;
                    if (threeData) {
                      for (var k = 0; k < threeData.length; k++) {
                        if (threeData[k].checked == true) { //如果三级对应的是选中状态
                          dataArr.push(threeData[k].id) //把三级级选中对应的id放进数组

                        }
                      }
                    }


                  }
                }
              }

            }
          }
        }

        return dataArr;
      },
```

后面想用递归优化上面的三层循环,代码如下:

```
digui: function (data, dataArr) {
        if (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].checked == true) { //如果二级对应的是选中状态
              dataArr.push(data[i].id);//把二级选中对应的id放进数组
              var data = data[i].children;
              this.digui(data, dataArr)
            }
          }
          return dataArr
        }

      },
```

调用递归的代码如下:需要传参1.一个需要遍历取id的数组,2一个存放取出来id的空数组

代码如下:

```js
var dataArr = [];
        this.role.menuIds=this.digui(this.Mydata,dataArr)
```

