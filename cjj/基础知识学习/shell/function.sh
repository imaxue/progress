#! /bin/bash

fn() {
	local first_name=$1
  local middle_name=$2
  local family_name=$3
  echo "$first_name"
  echo "$middle_name"
  echo "$family_name"
  return 0
}

fn "tony" "kid" "leung"

# 输出函数的返回值
echo $?;

result=$(fn "Herbert" "George" "Wells")
echo ${#result}
echo "函数返回的值：$result";