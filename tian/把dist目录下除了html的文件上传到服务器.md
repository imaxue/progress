```js
const { BosClient } = require('bce-sdk-js');
const glob = require('glob');
const { keyPrefix } = require('./config');

const config = {
  endpoint: 'https://cdnjtzy.bj.bcebos.com',
  credentials: {
    ak: '5b42f184dd5f459095b074593826b330',
    sk: '0ebf52631bc1434096ee9c9e7bc79391',
  },
};
const client = new BosClient(config);

const bucket = ''; // bucket需要设为空

const upload = (() => {
  const uploadFile = (item) => {
    const { file, key } = item;
    return client
      .putObjectFromFile(bucket, key, file)
      .then(() => {
        console.log(`${file}上传成功`);
      })
      .catch((error) => {
        console.log(`${file}上传失败`);
        console.error(error);
      });
  };
  return (files) => {
    files
      .map(e => ({ file: e, key: e.replace('./dist', keyPrefix) }))
      .forEach((e) => {
        uploadFile(e);
      });
  };
})();

// 匹配 dist 里 所有非 html 文件
const files = glob.sync('./dist/**/*.*', {
  ignore: './**/*.html',
});

if (files.length) {
  upload(files);
} else {
  console.error('[error] 请先运行 npm run build');
}

```
