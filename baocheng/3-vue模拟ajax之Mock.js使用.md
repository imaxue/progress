# Mock.js ：生成随机数据，拦截 Ajax 请求
## 官网：http://mockjs.com/


## 好处：	
	
1.前后端分离
让前端攻城师独立于后端进行开发，不需要等待后台接口，可以先自己写一个假数据来模拟
	
2.开发无侵入
不需要修改既有代码，就可以拦截 Ajax 请求，返回模拟的响应数据。
	
3.数据类型丰富
支持生成随机的文本、数字、布尔值、日期、邮箱、链接、图片、颜色等。

4.增加单元测试的真实性
通过随机数据，模拟各种场景。

### 安装：npm install 


### 使用：

   > 1.引入Mock  
      import Mock from 'mockjs'


    2.引入模拟数据 
    import frequency from './frequency'

    frequency.js 如下：

    export default{
      abc: config => {
          return {
            "respDesc": "成功",
            "data": {
              "rows": [
                {
                  "imgTypeId": 9,
                  "imgTypeName": "RC-135侦察机",
                  "imgPicUrl": "http://47.93.82.37:8180/4901b653-47c2-457d-b914-97443e4d72df.jpg",
                },
                {
                  "imgTypeId": 9,
                  "imgTypeName": "RC-135侦察机",
                  "imgPicUrl": "http://47.93.82.37:8180/4901b653-47c2-457d-b914-97443e4d72df.jpg",
                },
                {
                  "imgTypeId": 9,
                  "imgTypeName": "RC-135侦察机",
                  "imgPicUrl": "http://47.93.82.37:8180/4901b653-47c2-457d-b914-97443e4d72df.jpg",
                },
                {
                  "imgTypeId": 9,
                  "imgTypeName": "RC-135侦察机",
                  "imgPicUrl": "http://47.93.82.37:8180/4901b653-47c2-457d-b914-97443e4d72df.jpg",
                }
              ],
              "recordsTotal": 10,
              "total": 10,
              "pageNo": 1
            },
            "respCode": "0000"
          }
        }
    }



  >   3. Mock.mock( rurl, rtype, function( options ) )

    记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。

    Mock.mock(/\/abc\/list/, 'get', frequency.abc)
    暴露Mock
    export default Mock

  >   4. 模拟数据请求
   
      axios('/abc/list')
      .then(res => {
          let data=res.data
      }).catch(error => {
            console.log(error)
      })
      这个时候数据可以正常返回，一旦后台接口开发完毕，只需要简单修改接口即可调通
        将axios('/abc/list') 替换为 axios(url,method,data)

      axios(url,method,data)
      .then(res => {
          let data=res.data
      }).catch(error => {
            console.log(error)
      })
          
