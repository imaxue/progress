```python
# import math
# my_name = 'guo'
# my_age = 35
# my_height = 74
# my_weight = 180
# my_eyes = 'Blue'
# my_teeth = 'White'
# my_hair = 'Black'

# print("Let's talk about %s."% my_name)
# print("He's %d inches tall"% my_height)
# print("He's %d pounds heavy"% my_weight)
# print("Actually that's not too heavy.")
# print("He's got %s eyes and %s hair."%(my_eyes, my_hair))
# print("His teeth are usually %s depending on the coffee"% my_teeth)
# print("if I add %d,%d and %d I get %d."%(my_age,my_height,my_weight,my_age+my_height+my_weight))

#------------------------------------------

# r = float(input('请输入圆的半径：'))
# c = math.pi * 2 * r
# s = math.pi * r * r
# print('圆的周长是%d,圆的面积是%s'%(c, s))

#------------------------------------------

# tabby_cat = "\tl'm tabbed in."
# persian = "I'm split\non a line."
# backslash_cat = "I'm \\ a \\ cat"
# fat_cat = """
# I'm do a list:
# \t* Cat food
# \t* Fishies
# \t* Catnip\n\t*Grass
# \t*%d
# """

# print(tabby_cat)
# print(persian)
# print(backslash_cat)
# print(fat_cat % 55)

#------------------------------------------

# print("How old are you?")
# age = input()
# print("How tall are you?")
# height = input()
# print("How much do you weight")
# weight = input()

# print("So you're %r old,%r tall and %r heavy."%(age, height, weight))

#------------------------------------------

# age = input("How old are you?")
# height = input("How tall are you?")
# weight = input("How much do you weight?")

# print("So you're %r old,%r tall and %r heavy."%(age, height, weight))

#------------------------------------------

# n = int(input("请输入一个正整数："))
# def is_prime(a):
#     return a > 1 and all((a % i) for i in range(2, a))

# print(f"{n} {'是' if(is_prime(n)) else '不是'} 素数")

#------------------------------------------

# import functools


# def is_prime(a):
#     return a > 1 and all((a % i) for i in range(2, a))

# def log(text):
#     def decorator(func):
#         @functools.wraps(func)
#         def wraps(*args, **kw):
#             print('%s %s():'%(text, func.__name__))
#             print('结果为：')
#             return func(*args, **kw)
#         return wraps
#     return decorator

# @log('111')
# @log('调用开始')
# def func(n):
#     if is_prime(n):
#         return f'{n}是素数'
#     return f'{n}不是素数'

# while True:
#     n = int(input("请输入一个正整数："))
#     print(func(n))

#------------------------------------------

# flags = False
# tempDict = {}
# arr = [2, 10, 7, 8 ,123, 2312, 86, 453, 435]
# arr = [4, 10, 18, 22, 50, 100]
# def is_prime(a):
#     flag = True
#     for i in (2, a - 1):
#         if a % i == 0:
#             flag = False
#             break
#     return flag
# for i in range(len(arr)):
#     if is_prime(arr[i]):
#         tempDict[f'第{i + 1}个'] = arr[i]
#         flags = True
# print(f"{arr}中{'有' if (flags) else '没有'}素数。{f'其中素数有{tempDict}' if (flags) else ''}")

#------------------------------------------

# test = {'a': 1, 'b': 2}
# print({
#     'm': 3,
#     **test
# })

#------------------------------------------

# from sys import argv
# script, first, second, third = argv
# print("The script is called:",script)
# print("Your first variable is:", first)
# print("Your second variable is:", second)
# print("Your third variable is:", third)

#------------------------------------------

# def fib(n):
#     i, a, b = 0, 0, 1
#     while i < n:
#         yield b
#         a, b = b, a + b
#         i = i + 1

# for i in fib(6):
#     print(i)

# ------------------------------------------

# import sys

# def test():
#     args = sys.argv
#     if len(args)==1:
#         print('Hello, world!')
#     elif len(args)==2:
#         print('Hello, %s!' % args[1])
#     else:
#         print('Too many arguments!')

# if __name__=='__main__':
#     test()

# ------------------------------------------

# mac下 python3.7 安装PIL(Python Imaging Library) 一个处理图片的库，非常好用
# 先安装Xcode，然后安装Homebrew 这个过程时间可能会很长，安装后运行
# ```
#     brew install libtiff libjpeg webp little-cms2
# ```
# 构建好Python后，运行
# ```
#     pip install Pillow
# ```
# 后来我发现还是不能用啊，然后把Pillow卸载，又重新装了一遍
# ```
#     pip3 install Pillow
# ```
# 运行下面代码，ok  成功

# from PIL import Image
# im = Image.open('测试.png')
# print(f'图片信息：{im.format, im.size, im.mode}')

# -------------------------------------------

# s = [1, 2, 3]
# print(dir([]))
# print(s.__le__, s.__len__())

# -------------------------------------------

# class Chain(object):
    
#     def __init__(self, path=''):
#         self._path = path

#     def __getattr__(self, path):
#         return Chain('%s/%s' % (self._path, path))

#     def __str__(self):
#         return self._path
    
#     def __call__(self):
#         print(f'哈喽，{self._path}')

# s = Chain('boys')
# s();
# print(Chain('1234').status.user.timeline.list)
# print(callable(Chain()))

# -------------------------------------------

# def foo(s):
#     n = int(s)
#     return 10 / n

# def bar(s):
#     try:
#         return foo(s) * 2
#     except(StandardError, e):
#         print('Error!')
#         raise

# def main():
#     bar('0')

# main()

# -------------------------------------------

# f = open('./read.text')
# print(f.read())

# try:
#     f = open('./read.text')
#     print(f.read())
# finally:
#     if f:
#         f.close()

# with open('./read.text') as f:
#     print(f.read())

# with open('./read.text', 'r') as f:
#     print(f.readlines())

# f = open('./read.text', 'w')
# f.write("I'm writing")
# f.close()

# with open('./read.text', 'w') as f:
#     f.write("I'm wirting tooooo")

# -------------------------------------------

# import os

# def serch(a, b):
#     for file in os.listdir(a):
#         if os.path.isfile(os.path.join(a, file)):
#             if b in file:
#                 print(os.path.join(a, file))
#         else:
#             serch(os.path.join(a, file),  b)

# serch(os.path.abspath('.'), 'py')

# -------------------------------------------

# import os

# print('Process (%s) start'% os.getpid())

# pid = os.fork()
# if pid == 0:
#     print("I'm child process (%s) and my parent is %s."%(os.getpid(), os.getppid()))
# else:
#     print("I (%s) just created a child process (%s)."%(os.getpid(), pid))

# if pid:
#     print('Fathen End')
# else:
#     print('Child End')

# -------------------------------------------

# import subprocess

# print ('$ nslookup www.baidu.com')
# r = subprocess.call(['nslookup', 'www.baidu.com'])
# print('Exit code:', r)

# -------------------------------------------

```
