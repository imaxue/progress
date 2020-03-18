#! /bin/bash

name="Junjun chen"

echo ${age:-"18"}; # 18
echo ${name:-"jack"} # Junjun chen

echo "$name的年龄是：${age:=24}"; # Junjun chen的年龄是：24

str=${name:1:2}
echo "$str" # un

echo ${name:0:${#name}-5} # Junjun
sex=
tru_sex=${sex:?"请输入性别"}
# sex未赋值，程序至此退出并输出：sex: 请输入性别
echo "$tru_sex"
