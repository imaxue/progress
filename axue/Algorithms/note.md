# 算法笔记





## 排序

### 选择排序

> 将数组中最小的元素选出, 和第一个元素进行交换; 将第二小的元素选出, 和第二个元素进行交换, 直至所有元素交换完毕.



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

// 外层遍历, 遍历数组
for (let i = 0, l = arr.length; i < l; i++) {
    
    // 拿出一个数, 插入前面的有序序列中, 并保证插入后的序列仍然是有序的
    for (let j = i; j > 0 && less(arr[j], arr[j - 1]); j--) {
        exchange(arr, j, j - 1);
    }
}
```



