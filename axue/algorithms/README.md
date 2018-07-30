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

