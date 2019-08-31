## 普通json

```
//发送一个`POST`请求
axios({
    method:"POST",
    url:'/user/12345',
    data:{
        firstName:"Fred",
        lastName:"Flintstone"
    }
});
```

## 普通formdata

```
import axios from 'axios'
import qs from 'qs'
let config = {
    baseURL: '/api/',
    timeout: 10000,
    //`headers`选项是需要被发送的自定义请求头信息
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    transformRequest: [function (data) {  
        //需要序列化数据，数据放到formdata 
        return qs.stringify(data)
    }]
}
axios({
    method:"POST",
    url:'/user/12345',
    data:{
        firstName:"Fred",
        lastName:"Flintstone"
    },
    ...config
});
```
## 发送文件

```
let formdata = new FormData()
	formdata.append('data', fs.createReadStream(pathUrl))
	formdata.append('extension', 'js')
	axios.post(uploadUrl, formdata, {
		headers:formdata.getHeaders(),
	}).then(res=>{
		console.log('res')
		console.log(res)
	})
```
