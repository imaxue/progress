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