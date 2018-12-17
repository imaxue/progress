## 本地缓存localStorage、mencached、redis封装

### 一、H5本地缓存封装

>localStorage: 封装在工具文件util.js

#### 1、localStorage.getItem(key)

```
  static __Instance;

  constructor() {
    this._TempSaveContent = {};
  }

  /**
   * 实例
   * @returns {*}
   */
  static instance() {
    if (this.__Instance === null || typeof this.__Instance === 'undefined') {
      this.__Instance = new this();
    }
    return this.__Instance;
  }

  /**
   * 获取内容，
   * @method _GetContent
   * @param key 健名称。其实就是 _TempSaveContent的属性名称。
   * @return {*} 返回内容
   * @private
   */
  static getContent(key, IsUser) {
    try {
      let __Content = null;
      const __self = this.instance();
      if (__self._TempSaveContent[key]) {
        __Content = __self._TempSaveContent[key];
        return __Content;
      }
      if (typeof window === 'undefined') {
        return null;
      }
      if (__Content === null || typeof __Content === 'undefined') {
        const _value = window.localStorage.getItem(key);
        if (_value !== null && _value !== '' && typeof _value !== 'undefined') {
          const __JSONValue = JSON.parse(_value);
          __self._TempSaveContent[key] = __JSONValue;
          if (IsUser) {
            // 
          }
          __Content = __self._TempSaveContent[key];
        }
      }

      return __Content;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

```

#### 2、localStorage.setItem(key, value)

```

  /**
   * 设置内容,这里主要是用来存放临时数据的。
   * @method _SetContent
   * @param key  键值，用于下次的时候获取内容用的。其实就是 _TempSaveContent的属性名称。
   * @param content 要存储的内容
   * @param isSaveLocalStorage 是否保存到本地存储里面
   * @param IsUser 根据用户uid 来获取缓存里的数据。
   * @private
   */
  static setContent(key, content, isSaveLocalStorage, IsUser) {
    try {
      const self = this.instance();
      if (isSaveLocalStorage) {
        let __Content = content;
        if (IsUser) {
          const __UserInfo = self._TempSaveContent[UserInfo] || {};
          if (typeof __UserInfo !== 'undefined' && __UserInfo !== null) {
            __Content = {};
            __Content[__UserInfo.uderId] = content;
          }
        }
        __Content = JSON.stringify(__Content);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, __Content);
        }
      }
      self._TempSaveContent[key] = content;
    } catch (ex) {
      console.log(ex);
    }
  }

```

#### 2、localStorage.removeItem(key)

```

  /**
   * 删除指定字段值。
   * @method __RemoveContent
   * @param key
   * @return {null}
   * @private
   */
  static removeContent(key, IsRemoveLocalStorage) {
    try {
      const __self = this.instance();
      if (key === null || typeof key === 'undefined') {
        return;
      }
      if (__self._TempSaveContent[key]) {
        delete __self._TempSaveContent[key];
      }

      if (IsRemoveLocalStorage && typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (ex) {
      this.printLog(ex.toString());
    }
  }


```

### 二、memcache缓存封装

#### 1、memcached包

[node-memcache](https://github.com/elbart/node-memcache)

[memcached](https://github.com/3rd-Eden/memcached)

##### A、node 服务端封装

```
memcache.ts

npm i node_memcached

import * as memcache from 'node_memcached'
const client = createMemcache()

export default {
    duration: 1 * 60 * 60 * 24, // 缓存时长
    client,
    get(key): Promise<string> {
        return new Promise((resolve, reject) => {
            client.get(key, (err, res) => {
                if (err) return reject(err)
                // resolve(res)
                try {
                    const parserRes = JSON.parse(res)
                    resolve(parserRes)
                } catch (e) {
                    resolve(res)
                }
            })
        })
    },
    set(key, value, duration = this.duration) {
        client.set(key, value, duration)
    },
    del(key: string) {
        return new Promise((resolve, reject) => {
            client.delete(key, (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })
    },
    /**
     * @desc 创建新的客户端
     */
    createClient() {
        this.client = createMemcache()
        return this
    },
}

function createMemcache() {
    const user = {
        username: process.env.MEMCACHE_USERNAME,
        password: process.env.MEMCACHE_PASSWORD,
    }
    const client = memcache.createClient(process.env.MEMCACHE_PORT, process.env.MEMCACHE_HOST, user)
    client.on("error", (err) => {
        console.error("Error " + err)
    })
    return client
}

```

##### B、环境变量的配置：（需要运维提供memcached服务器变量)

```
Dockerfile.dev

FROM node:8.6.0
WORKDIR /www/
RUN npm config set registry https://registry.npm.taobao.org 

ADD ./package.json /www/
RUN npm install --production

ENV TZ=Asia/Shanghai \
    NODE_ENV="production" \
    # API_URI="" \
    API_URI="" \
    ADMIN_API="" \
    RES_URL="" \
    MEMCACHE_HOST=""\
    MEMCACHE_USERNAME=""\
    MEMCACHE_PASSWORD=""\
    MEMCACHE_PORT=""\
    REDIS_HOST=''\
    REDIS_PASSWORD=''\
    REDIS_DB=9\
    MONGOOSE_URI="" \
    PORT=3000
RUN ln -snf 

EXPOSE 3000

```

##### C、example使用实例: 文章详情的缓存，并且记录请求接口的数和走缓存的数

```
    import MyMemcache from './memcache'
    // MyMemcache缓存，并记录接口请求次数
    const detailCache = await MyMemcache.get(String(groupId) + '-article') as any
    let count = Number(await MyMemcache.get('countNum2') || 1)
    let cacheCount = Number(await MyMemcache.get('cacheCount2') || 1)
    // console.log('接口count', count)
    // console.log('缓存count', cacheCount)
    let article
    const duration = 5 * 60 * 60 * 24  // 缓存时长五天
    if (detailCache && typeof detailCache === 'object') {
        article = detailCache
        cacheCount++
        MyMemcache.set('cacheCount2', cacheCount)
    } else {
        count++
        article = (await client.getNewDetails({}, { groupId: String(groupId) })) as any
        MyMemcache.set('countNum2', count)
        if (article && JSON.stringify(article) !== '{}') {
            MyMemcache.set(String(groupId) + '-article', JSON.stringify(article), duration)
        }
    }

```

### 三、redis缓存封装

#### 1、redis包

**注意：redis的环境变量在上边的Dockerfile.dev中**

[redis](https://github.com/NodeRedis/node_redis#sending-commands)

##### A、node 服务端封装

```
myRedis.ts

npm install redis

import * as redis from 'redis'

const redisOpt: any = {
    db: process.env.REDIS_DB,
    host: process.env.REDIS_HOST,
}

if (process.env.REDIS_PASSWORD) redisOpt.password = process.env.REDIS_PASSWORD

const redisClient = redis.createClient(redisOpt)

const redisKey = {
    articlePre: '1:',
    place: 'place',
    user: 'user',
    channels: 'channels',
    extendImages: 'extendImages',
    article: 'article',
    baiduHot: 'baiduHot', // baiduHot
    h5Advertisements: 'h5Advertisements', // 新版H5的广告
}

const myRedis = {
    get(key): Promise<any> {
        if (process.env.DISABLE_REDIS) return Promise.resolve(null)
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, res) => {
                if (err)
                    return reject(err)
                try {
                    const parserRes = JSON.parse(res)
                    resolve(parserRes)
                } catch (e) {
                    resolve(res)
                }
            })
        })
    },
    hget(objName: string, key: string): Promise<any> {
        if (process.env.DISABLE_REDIS) return Promise.resolve(null)
        return new Promise((resolve, reject) => {
            redisClient.hget(objName, key, (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })
    },
    del(key: string) {
        return new Promise((resolve, reject) => {
            redisClient.del(key, (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })
    },
    set(key, value, expire?: number) {
        if (typeof value === 'object') value = JSON.stringify(value)
        return new Promise((resolve, reject) => {
            redisClient.set(key, value, (err, reply) => {
                if (err)
                    return reject(err)
                resolve('redis本地存储' + key + ' : ' + reply)
                console.error('redis本地存储' + key + ' : ' + reply)
            })
            if (expire) redisClient.expire(key, expire)
        })
    },
}

redisClient.on('error', (err) => {
    console.error('redis连接错误： ' + err)
})

export { redisClient, myRedis, redisKey }

```

##### B、使用实例

```

import { myRedis, redisClient, redisKey } from './myRedis'

export async function getExtendImage(albumId: string, eid: string) {
    const extendImages = await myRedis.get(redisKey.extendImages) || []
    const selfEid = parseInt(eid, 10)
    if (Number.isNaN(selfEid)) throw new Error('eid应该是数字！')
    const extendImage = extendImages.find(item => item.albumId === albumId && item.eids.includes(selfEid)) || {}
    return extendImage.extends || []
}

function getRedisDetail(detailId: string, language: string): Promise<{ body: object }> {
    const key = language + ':albumId_:' + detailId
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, res) => {
            if (err) return reject(err)
            resolve(JSON.parse(res))
        })
    })
}

function setRedisDetail(detailId: string, value: IGroupImage, language: string) {
    const key = language + ':albumId_:' + detailId
    return new Promise((resolve, reject) => {
        redisClient.set(key, JSON.stringify(value), (err, res) => {
            if (err) return reject(err)
            console.log('详情页保存redis缓存成功，id：', key)
            resolve(res)
            redisClient.expire(key, redisCacheDuration)
        })
    })
}


myRedis.get('belleId').then(belleId => {
    myRedis.set('belleId', (belleId + ',' + imageId).replace('null,', ''))
})

```








