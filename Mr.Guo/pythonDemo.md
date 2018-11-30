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

# Socket通信

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

## 微信拦截撤回消息
itchat是一个开源的微信个人号接口，使用python调用微信从未如此简单。使用不到三十行的代码，你就可以完成一个能够处理所有信息的微信机器人。
当然，该api的使用远不止一个机器人，更多的功能等着你来发现，比如这些。该接口与公众号接口itchatmp共享类似的操作方式，学习一次掌握两个工具。
如今微信已经成为了个人社交的很大一部分，希望这个项目能够帮助你扩展你的个人的微信号、方便自己的生活。

```python
    #!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import shutil
import time
import itchat
from itchat.content import *


# 定义一个字典，保存消息的信息。
msg_dict = {}

# 创建一个目录，用于存放消息临时文件。
rec_tmp_dir = "/Users/matianhe/itchat/rec_tmp/"
if not os.path.exists(rec_tmp_dir):
     os.mkdir(rec_tmp_dir)


face_bug = None


# 注册消息接收器
@itchat.msg_register([TEXT, PICTURE, MAP, CARD,             SHARING, RECORDING,
                       ATTACHMENT, VIDEO])
def handler_receive_msg(msg):
     global face_bug
     msg_time_rec = time.strftime("%Y-%m-%d %H:%M%S", time.localtime())
     msg_id = msg['MsgId']
     msg_time = msg['CreateTime']
     msg_from = (itchat.search_friends(userName=msg['FromUserName']
                                       ))["NickName"]
     msg_content = None
     msg_share_url = None

     if msg['Type'] == 'Text' or msg['Type'] == 'Friends':
         msg_content = msg['Text']
     elif msg['Type'] == 'Recording' or msg['Type'] == 'Attachment' \
             or msg['Type'] == 'Video' or msg['Type'] == 'Picture':
         msg_content = r"" + msg['FileName']
         msg['Text'](rec_tmp_dir + msg['FileName'])
    elif msg['Type'] == 'Card':
         msg_content = msg['RecommendInfo']['NickName'] + r" 的名片"
    elif msg['Type'] == 'Map':
         x, y, location = re.search("<location x=\"(.*?)\" y=\"(.*?\".*lable= \
                                    \"(.*?)\".*", msg['OriContent']).group(1, 2,
                                                                           3)
         if location is None:
             msg_content = r"纬度->" + x.__str__() + " 经度->" + y.__str__()
         else:
             msg_content = r"" + location
     elif msg['Type'] == 'Sharing':
         msg_content = msg['Text']
         msg_share_url = msg['Url']
     face_bug = msg_content

     msg_dict.update({
         msg_id: {
             "msg_from": msg_from, "msg_time": msg_time,
             "msg_time_rec": msg_time_rec, "msg_type": msg["Type"],
             "msg_content": msg_content, "msg_share_url": msg_share_url
         }
     })


@itchat.msg_register([NOTE])
def send_msg_helper(msg):
    global face_bug
     if re.search(r"\<\!\[CDATA\[.*撤回了一条消息\]\]\>", msg['Content']) \
             is not None:
         old_msg_id = re.search("\<msgid\>(.*?)\<\/msgid\>", \
                                 msg['Content']).group(1)
         old_msg =msg_dict.get(old_msg_id, {})
         if len(old_msg_id) < 11:
             itchat.send_file(rec_tmp_dir + face_bug,
                                toUserName='filehelper')
            os.remove(rev_tmp_dir + face_bug)
         else:
             msg_body = "有人撤回消息" + "\n" \
                 + old_msg.get('msg_from') + " 撤回了 " \
                 + old_msg.get('msg_type') + " 消息" + "\n" \
                 + old_msg.get('msg_time_rec') + "\n" \
                 + r"" + old_msg.get('msg_content')
             if old_msg['msg_type'] == "Sharing":
                 msg_body += "\n就是这个连接->" + old_msg.get('msg_share_url')
             itchat.send(msg_body, toUserName='filehelper')
             if old_msg["msg_type"] == "Picture" \
                     or old_msg["msg_type"] == "Recording" \
                     or old_msg["msg_type"] == "Video" \
                     or old_msg["msg_type"] == "Attachment":
                 file = '@fil@%s' % (rec_tmp_dir + old_msg['msg_content'])
                 itchat.send(msg=file, toUserName='filehelper')
                 os.remove(rec_tmp_dir + old_msg['msg_content'])
             msg_dict.pop(old_msg_id)


 if __name__ == "__main__":
     itchat.auto_login(hotReload=True, enableCmdQR=2)
     itchat.run()

```
原文：https://www.jianshu.com/p/30675d75f23a
