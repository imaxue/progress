# NumPy

> **NumPy**是Python一个扩展程序库。支持高阶大量的维度数组与矩阵运算，此外也针对数组运算提供大量的数学函数库
>
> NumPy的核心是**ndarray**其中**nd**代表n维

##### numpy底层是C语言写的性能优越

```python
import time
import numpy as np

x = np.random.random(100000000)

# 使用原生python消耗的时间
start = time.time()
sum(x) / len(x)
print(time.time()-start) // 8.065738916397095

# 使用 numpy 消耗的时间
start = time.time()
np.mean(x)
print(time.time()-start) // 0.06101584434509277

# 对于大量的数据操作性能比原生的 好很多
```



#### 创建ndarrays

- 使用常规的python list
- 使用内置的Numpy函数



