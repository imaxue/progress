#### 1、定义和用法
- replace() 方法用于在字符串中用一些字符替换另一些字符
- 或替换一个（或者多个）与正则表达式匹配的子串

#### 2、语法
- stringObject.replace(regexp/substr,replacement)
- 参数regexp/substr：必需
  - 规定子字符串或要替换的模式的 RegExp 对象
- 参数replacement：必需
  - 一个字符串值。规定了替换文本或生成替换文本的函数

#### 3、返回值
- 一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的

#### 4、说明
- 字符串 stringObject 的 replace() 方法执行的是查找并替换的操作
- 它将在 stringObject 中查找与 regexp 相匹配的子字符串，然后用 replacement 来替换这些子串
- 如果 regexp 具有全局标志 g，那么 replace() 方法将替换所有匹配的子串。否则，它只替换第一个匹配子串

#### 5、 replacement高级用法
- replacement 可以是字符串，也可以是函数
- replacement 中的 $ 字符具有特定的含义：
  - $1、$2、...、$99
    - 与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
  - $&
    - 与 regexp 相匹配的子串。
  - $`
    - 位于匹配子串左侧的文本
  - $'
    - 位于匹配子串右侧的文本
  - $$
    - 直接量符号

#### 6、实战:replace隐藏电话号码中间四位数
- 代码：
    ```
    let str = "18588883010".replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
    //str 185****3010
    ```
- replace()方法的第二个参数：https://www.jianshu.com/p/31bebd90fd1d