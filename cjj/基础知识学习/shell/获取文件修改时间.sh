#! /bin/bash
#文件名
FILE_NAME='test1.sh'
#获取文件做后修改时间戳
LAST_MODIFY_TIMESTAMP=`stat -c %Y  $FILE_NAME`
#格式化时间戳
formart_date=`date '+%Y-%m-%d %H:%M:%S' -d @$LAST_MODIFY_TIMESTAMP`
echo $formart_date