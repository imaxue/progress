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