## koa实现文件上传以及中间件的简单使用

#### 1、antd design的Upload组件实现文件上传：

```

              <div style={{ marginTop: 20 }}>
                    <Upload
                        action="/production/production/upload"
                        multiple={true}
                        name="coverImage"
                        onChange={async ({ fileList }) => {
                            if (fileList.every(item => item.status === 'done')) {
                                let value = this.value.slice().sort((a: any, b: any) => a.sort - b.sort)
                                value = value.filter((item: any) => !deleteIds.includes(item.id))
                                this.value = value
                                let ids = this.value.map((u: any) => u.id)
                                let fileLists = fileList.filter(i => !ids.includes(i.uid)).filter(j => !deleteIds.includes(j.uid))
                                let num = this.value.length === 0 ? 0 : this.value[this.value.length - 1].sort + 1
                                let data = [] as any
                                for (let u of fileLists) {
                                    data.push(await getImageMeasureByImgFile(u.originFileObj))
                                }
                                this.value.push(...fileLists.map((item, index) => ({ type: DetailItemType.image, sort: num + index, content: '', image: { url: item.response, width: data[index].width, height: data[index].height }, id: item.uid })))
                                this.props.onChange && this.props.onChange(toJS(this.value))
                            }
                        }}
                        showUploadList={false}
                    >
                        <Button>
                            <Icon type="upload" /> 上传产品图片
                        </Button>
                    </Upload>
                </div>
           
 ```
 
 #### koa接口封装和中间件：
 
 ```
 import * as Router from 'koa-router'
import * as mongoose from 'mongoose'
import { saveImage } from '../../lib/oss'
import { Document } from 'mongoose'
const multer = require('koa-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = new Router()

router.prefix('/production/production')


// 上传入口图
router.post('/upload', upload.single('coverImage'), async ctx => {
    const file = ctx.req.file // 获取文件
    const src = await saveImage(file, 'shop/') // 文件上传处理
    ctx.body = src
})

// 多文件上传
router.post('/edit/upload', upload.array('img'), async ctx => {
    const files = ctx.req.files
    if (!files || files.length === 0) return ctx.throw(400, '确少上传的图片')
    const data = await Promise.all(files.map(file => saveImage(file, 'shop/')))
    ctx.body = {
        errno: 0,
        data,
    }
})


module.exports = router


 ```
