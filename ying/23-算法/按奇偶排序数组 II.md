> 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
>
> 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
>
> 你可以返回任何满足上述条件的数组作为答案。
>
>
>
> 示例：
>
> 输入：[4,2,5,7]
> 输出：[4,5,2,7]
> 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
>
>
> 提示：
>
> 2 <= A.length <= 20000
> A.length % 2 == 0
> 0 <= A[i] <= 1000

```javascript
function sortArrayByParityII(A){
    let j = 1;
    for (let i = 0; i < A.length - 1; i = i + 2) {
        if ((A[i] & 1) != 0) {
            while ((A[j] & 1) != 0) {
                j = j + 2;
            }
            let tmp = A[i];
            A[i] = A[j];
            A[j] = tmp;
        }
    }
    return A;
}
console.log(sortArrayByParityII([4,2,5,7,6,7,8,4,3,1,11,2]))

function  sortArrayByParityII2(A) {
    let j = 1;
    for(let i=0,l=A.length-1;i<l;i = i + 2){
        if(A[i] % 2){
            while(A[j] % 2){
                j = j + 2
            }
            let temp = A[i];
            A[i]= A[j];
            A[j] = temp;
        }
    }
    return A;
}
console.log(sortArrayByParityII2([4,2,5,7,6,7,8,4,3,1,11,2]))
```


总结
> 1、用法
>
> while和if本身就用法不同，一个是循环语句，一个是判断语句。
>
> 2、运行模式
>
> if 只做判断，判断一次之后，便不会再回来了。
> while 的话，循环，直到结果为false，才跳出来。
>
> 3、使用效果
>
> 链表的结构，要一直读下去，直到读完整个链表结构，所以需要while。
> if的话只读一次，便跳出了 。



