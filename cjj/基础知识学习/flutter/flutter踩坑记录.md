- 使用vscode，连接mumu模拟器时，模拟器app闪退。控制台报错
```
    Failed to setup Skia Gr content.
```
解决办法： 
将`android/app/src/main/kotlin/[project]/MainActivity.kt`文件按如下修改
```kotlin
// 引入这个包
import android.os.Bundle;

import io.flutter.embedding.android.FlutterActivity

class MainActivity: FlutterActivity() {
  // 添加onCreate方法，如果该方法不存在
  override fun onCreate(savedInstanceState: Bundle?) {
    // add this line to "onCreate" method
    this.getIntent().putExtra("enable-software-rendering", true)
    // don't forget to call "super"
    super.onCreate(savedInstanceState)
  }
}
```

- vscode 没有显示mumu模拟器连接
```powershell
adb connect 127.0.0.1:7555
```
> ps: 如果adb命令不可用。在mumu安装目录下的`emulator\nemu\vmonitor\bin`目录下有`adb_serve.exe`

- flutter编译卡在`Running Gradle task 'assembleDebug'.`.需要设置阿里云加速
  - 打开项目目录下`android/build.gradle`文件，
  ```gradle
    buildscript {
        ext.kotlin_version = '1.3.50'
        repositories {
            // google()
            // jcenter()
            // 修改处
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/jcenter' }
            maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
        }
    
        dependencies {
            classpath 'com.android.tools.build:gradle:3.5.0'
            classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        }
    }
    
    allprojects {
        repositories {
            // google()
            // jcenter()
            // 修改处
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/jcenter' }
            maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
        }
    }
  ```
  - 打开fultter安装目录下`packages/flutter_tools/gradle/flutter.gradle`文件
  ```gradle
    buildscript {
        repositories {
            // google()
            // jcenter()
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/jcenter' }
            maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:3.5.0'
        }
    }
  ```
- 在使用flutter的时候，无意中点开了某个包的代码，发现`Widget?`这样的代码。然后在自己的代码中试着这样写，结果报错了。一搜索才发现这是sdk更新到2.12.0之后的新特性，于是将pubspec.yaml中的sdk版本号改为2.12.0。然后代码中出现好多依赖引入出现下波浪线提示，于是一个挨一个的将依赖进行升级。后来在stackoverflow发现可以这样操作进行升级
    ```bash
      # 切换sdk仓库到stable分支
      $ flutter channel stable
      # 升级sdk
      $ flutter upgrade
      # To perform a clean reinstall of the packages in your system cache, use pub cache repair
      # 清除package包缓存并重新安装
      $ flutter pub cache repair
      # flutter clean will delete the /build folder
      # 清除build缓存
      $ flutter clean
    ```
- 项目迁移至null safety
  ```bash
  # dart版本要求2.12以上
  $ dart --version
  # 检查您的依赖包的迁移状态
  $ dart pub outdated --mode=null-safety
  # 升级依赖至支持空安全的最新版本
  $ dart pub upgrade --null-safety
  ```
- 使用`ListTile.divideTiles`的时候提示`type 'Null' is not a subtype of type 'ListTile' in type cast`,原因是在使用`List.map`方法时没有传入泛型参数。**map后面要写widget类型 不然 因为闭包的原因无法识别**
```dart
// 报错代码
ListTile.divideTiles(
  context: context,
  tiles: [...].map(
    (e) => ListTile(
      title: Text('title'),
    )
  ),
).toList();
// 正确代码
ListTile.divideTiles(
  context: context,
  tiles: [...].map<Widget>(
    (e) => ListTile(
      title: Text('title'),
    )
  ),
).toList();
```
- 执行`flutter doctor --android-licenses`报错
提示：`Exception in thread "main" java.lang.NoClassDefFoundError...`
解决办法：从android studio的Android SDK Manager中安装`Android SDK Command-line tools`
    ```
        1. tools > sdk manager
        2. 依次选择Appearance & Behavior > System Settings > Android SDK
        3. 选择SDK Tools页签
        4. 勾选Android SDK Command-line tools并确认
    ```
- 提示android studio未安装
```bash
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel stable, 2.2.0, on Microsoft Windows [Version 10.0.19042.985], locale zh-CN)
[√] Android toolchain - develop for Android devices (Android SDK version 30.0.3)
[√] Chrome - develop for the web
[!] Android Studio (not installed)
[√] VS Code
[√] Connected device (2 available)
```
如果已经安装有android studio这种情况需要配置一下路径
```bash
flutter config --android-studio-dir="C:\Program Files\Android\Android Studio"
```