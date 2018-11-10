## 爬虫小demo

我们需要一个叫做requests的库，帮我们发请求获取数据，如果没有可以
```shell
    pip insatll requests

```

接下来直接上代码吧

```python
  
  #!/usr/bin/env python3
  # -*- coding: utf-8 -*-
  
  class SimpleCrawler:
    def crawl(self, params=None):
        # 请求的地址，这是获取掘金关注的列表接口
        url = "https://follow-api-ms.juejin.im/v1/getUserFolloweeList"
        # 保存我们拔取数据
        followee = []
        # 请求接口的参数
        params = {
            "uid": "5aba7cd1ef265dda237c68df07c",
            "currentUid": "5aba7c1dfefd265daadsf237c68f07c",
            "src": "web"
        }
        # 设置请求头信息，这个经常会用到，服务器反爬虫机制会判断客户端请求头中的User-Agent是否来源于真实浏览器，所以，我们使用Requests经常会指定UA伪装成浏览器发起请求
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
        }
        # 指定cookie，虽然 Cookie 也是请求头的一部分，我们可以从中剥离出来，使用 Cookie 参数指定，当然此次调用并不需要cookie
        cookies={'from-my': 'browser'})
        # 还可以设置请求超时，指定字段为timeout
        timeout = 5
        # requests.get(url, headers = headers, params=params, cookies=cookies, timeout=5)
        # 开始发送请求，用response接收我们的数据
        response = requests.get(url, headers = headers, params=params)
        for i in response.json()["d"]:
            followee.append({
                "username": i["followee"]["username"],
                "id": i["followerId"],
                "company": i["followee"]["company"],
                "jobTitle": i["followee"]["jobTitle"]
            })
        print(followee)
        # 将拿到的followee写入ex.json文件中
        with open('./ex.json', 'w') as f:
                json.dump(followee, f, ensure_ascii=False)
                print("保存完毕")

  SimpleCrawler().crawl()
  
```

一个小小的爬虫就写好了。

## 生成二维码小图片

我们需要一个叫做PIL的库来帮我们处理图片，如何装前面已经讲过了，我们直接来用

```python
  
  #!/usr/bin/env python3
  # -*- coding: utf-8 -*-
  
  # 导入我们需要的类
  from PIL import Image, ImageDraw, ImageFont, ImageFilter
  import random
  
  # 随机字母
  def rndChar():
    return chr(random.randint(65, 90))
  
  # 随机颜色1
  def rndColor():
      return (random.randint(64, 255), random.randint(64, 255), random.randint(64, 255))
   
  # 随机颜色2
  def rndColor2():
      return (random.randint(32, 127), random.randint(32, 127), random.randint(32, 127))
      
  # 图片宽高
  width = 60 * 4
  height = 60
  # 创建图片对象
  image = Image.new('RGB', (width, height), (255, 255, 255))
  
  # 创建Font对象：
  font = ImageFont.truetype('Arial.ttf', 36)
  
  # 创建Draw对象：
  draw = ImageDraw.ImageDraw(image)
  
  # 填充每个元素，就是图片的背景色
  for x in range(width):
      for y in range(height):
          draw.point((x, y), fill = rndColor())
  
  # 输出文字
  for t in range(4):
      draw.text((60 * t + 10, 10), rndChar(), font = font, fill = rndColor2())
  
  # 到这里我们就画完了，保存一下
  image.save('code.jpg')

```

## 使用GUI

```python

  #!/usr/bin/env python3
  # -*- coding: utf-8 -*-

  from tkinter import *

  class Application(Frame):
      def __init__(self, master=None):
          Frame.__init__(self, master)
          self.pack()
          self.createWidgets()

      def createWidgets(self):
          self.helloLable = Label(self, text = 'Hello World!')
          self.helloLable.pack()
          self.quitButton = Button(self, text = "退出", command=self.quit)
          self.quitButton.pack()

  app = Application()

  # 设置窗口标题
  app.master.title('Hello world,真牛')
  # 主消息循环
  app.mainloop()
  
  # 加入输入框
  
  from tkinter import *
  import tkinter.messagebox as messagebox

  class Application(Frame):
      def __init__(self, master=None):
          Frame.__init__(self, master)
          self.pack()
          self.createWidgets()

      def createWidgets(self):
          self.nameInput = Entry(self)
          self.nameInput.pack()
          self.alertButton = Button(self, text='点我', command=self.hello)
          self.alertButton.pack()

      def hello(self):
          name = self.nameInput.get() or 'Python牛逼'
          messagebox.showinfo('Message', 'Hello,%s' % name)

  app = Application()
  # 设置窗口标题
  app.master.title('python牛逼')
  # 主消息循环
  app.mainloop()

```

# TCP通信

```python
  
  # 服务端
  # 导入socket库:
  import socket
  import threading
  import time
  # 创建一个基于IPv4和TCP协议的Socket：
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  # 每个连接都必须创建新线程（或进程）来处理，否则，单线程在处理连接的过程中，无法接受其他客户端的连接：
  def tcplink(sock, addr):
      print('Accept new connection from %s:%s...' % addr)
      sock.send(b'Welcome!')
      while True:
          data = sock.recv(1024)
          print(data)
          time.sleep(1)
          if not data or data.decode('utf-8') == 'exit':
              break
          sock.send(('Hello,%s!' % data.decode('utf-8')).encode('utf-8'))
      sock.close()
      print('Connection from %s:%s closed.' % addr)

  # 监听端口:
  s.bind(('127.0.0.1', 9999))
  # 调用listen()方法开始监听端口，传入的参数指定等待连接的最大数量：
  s.listen(5)
  print('Waitting for connection...')
  # 服务器程序通过一个永久循环来接受来自客户端的连接，accept()会等待并返回一个客户端的连接:
  while True:
      sock, addr = s.accept()
      t = threading.Thread(target=tcplink, args=(sock, addr))
      t.start()
      
  # 客户端
  import socket

  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  # 建立连接:
  s.connect(('127.0.0.1', 9999))

  print(s.recv(1024).decode('utf-8'))
  for data in [b'Michael', b'Tracy', b'Sarah']:
      # 发送数据:
      s.send(data)
      print(s.recv(1024).decode('utf-8'))
  s.send(b'text')
  s.close()

```
