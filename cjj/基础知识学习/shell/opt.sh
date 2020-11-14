#! /bin/bash

while getopts "a:bc" opt; do
  case $opt in
    a)
      echo "this is -a the arg is ! $OPTARG" 
      ;;
    b)
      echo "this is -a the arg is ! $OPTARG" 
      ;;
    \?)
      echo "Invalid option: -$OPTARG" && exit 1
      ;;
  esac
done

echo "aaa"