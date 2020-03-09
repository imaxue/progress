#! /bin/bash
echo "Shell 传递参数实例！";
echo "第一个参数为：$1";

echo "参数个数为：$#";
echo "-- \$* 演示 ---"
for i in "$*"; do
    echo $i
done

echo "-- \$@ 演示 ---"
for i in "$@"; do
    echo $i
done

set -- `getopt -q ab:c "$@"`    # 通过set --，把反引号``内执行结果返回命令行；-q选项表示quit，不输出错误；b:表示带值选项-b；$@表示原来cmd参数列表

while [ -n "$1" ]               # 通过循环，遍历$1位置参数
do
    case "$1" in                # 使用case命令，匹配$1位置上的选项
    "-a")                       # 变量值最好用双引号括起来，关键字用小括号括起来
        echo "Option a"         # 若命令行输入-a，则命中，本行可写入相关选项逻辑
        ;;                      # 每个类别结尾使用两个连续的分号来处理
    # 获取-b选项的值
    "-b") 
        value="$2"              # $2是-b选项所在的位置变量 
        echo "Option b, value is $value"   # 若命令行输入-b，则命中，本行输出-b选项的值
        shift                   # 由于-b选项的值占有了一个位置变量，为了读取剩余选项，需要左移一位                
        ;;      
    "-c") 
        echo "Option c"         # 若命令行输入-c，则命中，本行可写入相关选项逻辑
        ;; 
    # 分离参数和选项
    "--")                       # --作为选项的结束
         shift                  # 左移$1位置变量，$2位置变量向前移动到$1
         break                  # 跳出循环
         ;;     
    esac
    shift                       # 把$2位置变量向前移动到$1，原$1位置变量不可用
done

echo "params are $*"            # 输出所有参数