# 学习flutter
记录开发(学习)flutter的过程
## 环境配置

## 搭建项目框架

## 项目配置
### assets本地资源配置
在pubspec.yaml文件中`flutter:`字段下配置需要的资源路径；注意要严格缩进(两个空格，或一个tab)；需要注意，如果要加载深层目录下的文件需要在assets下配置直接目录路径
```yml
# ...省略
flutter:
  use-material-design: true
  # 本地资源
  assets:
    # 引用单个文件资源
    - assets/images/logo.png
    # 如果assets/images下还有目录，需要在这里列出来，不然会引用不成功
    - assets/images/home/logo.png
    # 引用目录下的所有资源
    - assets/icon/
```