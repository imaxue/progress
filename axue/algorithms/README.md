# 算法笔记





## 排序



### 基础函数

```javascript
let arr = [27, 29, 50, 3, 32, 40, 27, 49, 34, 40];

/**
 * 比较x是否小于y
 * @number x
 * @number y
 * @returns {boolean}
 */
function less(x, y) {
    return x < y;
}

/**
 * 交换数组中的两个元素
 * @param a
 * @param i
 * @param j
 */
function exchange(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}
```



### 选择排序

> 将数组中最小的元素选出, 和第一个元素进行交换; 将第二小的元素选出, 和第二个元素进行交换, 直至所有元素交换完毕.

```javascript
// 外层遍历, 遍历数组
for (let i = 0, l = arr.length; i < l; i++) {
    let min = i;

    // 内层遍历, 比较当前元素和后面元素的大小
    for (let j = i; j < l; j++) {
        if (less(arr[j], arr[min])) {
            min = j;
        }
    }
    exchange(arr, i, min);
}
```





### 插入排序

> 将数值插入一个有序序列中的合适位置，此算法对于已经大致有序的序列，运算量较小。

```javascript

// 外层遍历, 遍历数组
for (let i = 0, l = arr.length; i < l; i++) {
    
    // 拿出一个数, 插入前面的有序序列中, 并保证插入后的序列仍然是有序的
    for (let j = i; j > 0 && less(arr[j], arr[j - 1]); j--) {
        exchange(arr, j, j - 1);
    }
}
```



### 快速排序

> 将数组分为两部分，分别进行排序，再将排序好的结果合并

```javascript

function quickSort(a) {
    if (a.length <= 1) {
        return a;
    }

    let pivot = a[0];
    let left = [];
    let right = [];

    for (let i = 1; i < a.length; i++) {
        if (less(pivot, a[i])) {
            right.push(a[i]);
        } else {
            left.push(a[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right))
}


```



> 另外一种快速排序方式, 原地排序, 空间复杂度更低

```javascript
function partition(array, low, high) {
    let i = low, j = high + 1;

    let v = array[low];

    while (true) {
        while (less(array[++i], v)) {
            if (i === high) {
                break;
            }
        }

        while (less(v, array[--j])) {
            if (j === low) {
                break;
            }
        }

        if (i >= j) {
            break;
        }

        exchange(array, i, j)
    }
    exchange(array, low, j);
    return j;
}

function quickSort(array, low, high) {

    if (high <= low) {
        return;
    }

    let pivot = partition(array, low, high);

    quickSort(array, low, pivot - 1);
    quickSort(array, pivot + 1, high);
}

quickSort(arr, 0, arr.length - 1)
console.log(arr);
```



### 动态规划

**问题: **


> 有一座高度是**10**级台阶的楼梯，从下往上走，每跨一步只能向上**1**级或者**2**级台阶。要求用程序来求出一共有多少种走法。
>
> 比如，每次走1级台阶，一共走10步，这是其中一种走法。我们可以简写成 1,1,1,1,1,1,1,1,1,1。
>
> 再比如，每次走2级台阶，一共走5步，这是另一种走法。我们可以简写成 2,2,2,2,2。 
>
> 当然，除此之外，还有很多很多种走法。 

一种方法就是：使用多重 for 循环，暴力枚举。时间复杂度为 **O(n^n)**

这时候就需要用到`动态规划`了.

> 动态规划, 英文名 Dynamic Programing, 是一种分阶段求解决策问题的数学思想, 它不仅用于编程领域, 也应用于管理学, 经济学, 生物学等. 
>
> 总结起来就是, 大事化小, 小事化了



现在来分析上面的问题, 假设现在只需要一步就可以走到第 10 级台阶, 有几种走法?

2 种, 一种是在第 8 级台阶, 一下走两级上去, 一种是在第 9 级台阶上, 走一级上去.

假设: 走到第 8 级台阶, 有 x 种方法, 走到第 9 级台阶, 有 y 种方法, 那么, 走到第 10 级台阶, 就有:

`x + y` 种方法. 

假如说, 走到第 10 级台阶的方法可以写作 F(10), 我们可以得到:

F(10) = F(9) + F(8)

走到第 9 级的方法有多少种呢? 

F(9) = F(8) + F(7)

由此, 我们可以得到一个结论
**F(1) = 1**

**F(2) = 2**

**F(n) = F(n - 1) + F(n - 2)**



动态规划算法中有三个重要的概念: 

`边界`, `最优子结构`, `状态转移公式`



前面分析过, 当 F(10) = F(9) + F(8) 时,

F(9) 和 F(8), 是 F(10) 的**最优子结构**.



当 n = 1, n = 2 时, 可以直接得出结果, 

F(1) 和 F(2), 就是问题的**边界**



F(n) = F(n - 1) + F(n - 2) , 就是每个阶段之间的**状态转移方程**



了解了上面的内容, 我们就可以进行下一步了, 求解:

最先考虑到的方式, 递归

```javascript
function getWayCount(n) {

    if (n < 0) {
        return 0;
    }
    
    if (n === 1) {
        return 1;
    }

    if (n === 2) {
        return 2;
    }

    return getWayCount(n - 1) + getWayCount(n - 2);
}


getWayCount(10)  // 89
```



但是这种方式, 有很多重复的计算, 比如说:

算 F(5) 的时候, 要算 F(4)

而算 F(6) 的时候, 也要算 F(4)

这样就浪费了性能.



有没有什么办法**优化**一下呢?

有的, 可以把每个阶段的计算结果, 保存起来, 下次用到的时候, 直接读取就行了.

这种算法有一个名字: **"备忘录算法"**

```javascript
let result = {};

function getWayCount(n) {
    if (n < 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    if (n === 2) {
        return 2;
    }

    if (result[n]) {
        return result[n];
    } else {
        return result[n] = getWayCount(n - 1) + getWayCount(n - 2);
    }
}

getWayCount(10)  // 89
```



但是这样还不是最优的!



我们可以将`自顶向下`的求解方式, 改为`自底向上`

通过观察我们发现, 每一项的结果, 都只依赖于**前两项的计算结果**

也就是说:

F(3) = F(1) + F(2)

F(4) = F(2) + F(3)

这样一来, 前面的结果都没有保存的必要了. 只保存最近的两项就可以.



```javascript
function getWayCount(n) {


    if (n < 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    if (n === 2) {
        return 2;
    }

    let x = 1, y = 2, temp;

    for (let i = 3; i <= n; i++) {
        temp = x + y;
        x = y;
        y = temp;
    }

    return y;
}
```



做一道动态规划练习题


> 有一个国家发现了5座金矿，每座金矿的黄金储量不同，需要参与挖掘的工人数也不同。参与挖矿工人的总数是10人。每座金矿要么全挖，要么不挖，不能派出一半人挖取一半金矿。要求用程序求解出，要想得到尽可能多的黄金，应该选择挖取哪几座金矿？
>
> 1. 500 金 / 5 人
> 2. 400 金 / 5 人
> 3. 350 金 / 3 人
> 4. 300 金 / 4 人
> 5. 200 金 / 3 人



首先对问题进行分析：如果使用动态规范算法，要确定三个要素，边界，最优子结构，动态转移方程

最优子结构：每座金矿有两种状态，挖或者不挖，五座金矿的最有子结构就是：

* 10 个工人挖 4 个金矿（第 5 个金矿不挖）
* 10 - n 个工人，挖 4 个金矿 （第 5 个金矿挖，并且用掉 n 个人）

上面这两种选项中效益最大的那个

假设，将金矿数设为 N，工人数设为 W，金矿黄金量设为数组 G[], 金矿的用工量设为数组 P[]

则可以推导出下面的公式

F ( 5, 10 ) = MAX ( F ( 4, 10), F ( 4, 10 - P[4] ) + G[4] )



然后, 确定一下问题的边界

> 当只有一个金矿, 并且人数足够的情况, 没的选, 只能挖, 黄金量 = G[0]
>
> **F(n,w) = g[0]     (n==1, w>=p[0]);**



> 当人数不够挖的时候, 或者金矿数挖完了
>
> **F(n,w) = 0    (n<=1, w<p[0]);**



> 当人数不够挖最后一个金矿的时候, 就集中精力挖前面的金矿呗!
>
> **F(n,w) = F(n-1,w)    (n>1, w<p[n-1])**  



> 最后, 使用我们上面归纳出的公式
>
> **F(n,w) = max(F(n-1,w),  F(n-1,w-p[n-1])+g[n-1])    (n>1, w>=p[n-1])**



**Talk is cheap. Show me the code.** ( 废话少数, 直接看代码 )

```javascript
const N = 5
const W = 10
const G = [500, 400, 350, 300, 200]
const P = [5, 5, 3, 4, 3]

function max(x, y) {
    return x >= y ? x : y
}

function optimum(n, w) {
    // 当只有一个金矿, 并且人数足够的情况, 没的选, 只能挖, 黄金量 = G[0]
    if (n === 1 && w >= P[0]) {
        return G[0];
    }

    // 当人数不够挖的时候, 或者金矿数挖完了
    if (n < 1 || (n === 1 && w < P[0])) {
        return 0;
    }

    // 当人数不够挖最后一个金矿的时候, 就集中精力挖前面的金矿呗!
    if (w < P[n - 1]) {
        return optimum(n - 1, w)
    }

    return max(optimum(n - 1, w), optimum(n - 1, w - P[n - 1]) + G[n - 1])
}


optimum(N, W) // 900
```



### 优先队列

**作用:** 快速找出队列中最大或最小的元素

**应用场景:** 
* 在操作系统中, 为每个应用分配一个优先级, 快速找出优先级最高的应用
* 粒子碰撞模拟
* 图搜索算法
* 数据压缩算法

**数据结构:** 二叉堆

**常用操作:** `删除最大元素` ***( 时间复杂度 O(logN) )*** , `插入元素` ***( 时间复杂度 O(logN)  )***

```javascript
class MaxPQ {

    constructor(n) {
        this.pq = new Array(n + 1) // 基于堆的完全二叉树
        this.len = 0; // 已使用的长度
    }

    /**
     * 比较大小
     * @param x
     * @param y
     * @returns {boolean}
     */
    less(x, y) {
        return this.pq[x] < this.pq[y];
    }

    /**
     * 交换队列中的元素
     * @param i
     * @param j
     */
    exchange(i, j) {
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;
    }

    /**
     * 返回最大的元素
     * @returns {*}
     */
    delMax() {
        let max = this.pq[1]
        this.exchange(1, this.len)
        this.pq[this.len--] = null
        this.sink(1)

        return max;
    }

    /**
     * 插入元素
     * @param k
     */
    insert(k) {
        this.pq[++this.len] = k;
        this.swim(this.len)
    }

    /**
     * 是否为空
     * @returns {boolean}
     */
    isEmpty() {
        return this.len === 0
    }

    /**
     * 当前元素个数
     * @returns {number}
     */
    size() {
        return this.len
    }

    /**
     * 上浮
     * @param k
     */
    swim(k) {
        while (k > 1 && this.less(Math.floor(k / 2), k)) {
            this.exchange(Math.floor(k / 2), k)
            k = Math.floor(k / 2)
        }
    }

    /**
     * 下沉
     * @param k
     */
    sink(k) {
        while (k <= this.len * 2) {
            let j = k * 2
            if (j < this.len && this.less(j, j + 1)) {
                j++
            }

            if (!this.less(k, j)) {
                break
            }

            this.exchange(j, k)

            k = j
        }
    }
}


let mq = new MaxPQ(20)

mq.insert(2)
mq.insert(7)
mq.insert(4)
mq.insert(10)
mq.insert(8)
mq.insert(9)

console.log(mq.delMax());

```



#### [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

注意你不能在买入股票前卖出股票。

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
```

**示例 2:**

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

解:

```javascript
var maxProfit = function (prices) {
  let min = Number.MAX_VALUE
  let max = 0

  for (let i = 0; i < prices.length; i++) {
    if(prices[i] < min) {
      min = prices[i]
    } else if(prices[i] - min > max) {
      max = prices[i] - min
    }
  }

  return max
}
```







