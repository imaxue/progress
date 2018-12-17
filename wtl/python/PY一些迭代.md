#### 迭代遍历一个集合中元素的所有可能的排列或组合

```python
items = ['a', 'b', 'c']
from itertools import permutations
for p in permutations(items):
	  print(p)
('a', 'b', 'c')
('a', 'c', 'b')
('b', 'a', 'c')
('b', 'c', 'a')
('c', 'a', 'b')
('c', 'b', 'a')


for p in permutations(items, 2):
	print(p)
('a', 'b')
('a', 'c')
('b', 'a')
('b', 'c')
('c', 'a')
('c', 'b')

from itertools import combinations
for c in combinations(items, 3):
     print(c)
('a', 'b', 'c')

for c in combinations(items, 2):
     print(c)
('a', 'b')
('a', 'c')
('b', 'c')

for c in combinations(items, 1):
    print(c)
('a',)
('b',)
('c',)

for c in combinations_with_replacement(items, 3):
    print(c)
('a', 'a', 'a')
('a', 'a', 'b')
('a', 'a', 'c')
('a', 'b', 'b')
('a', 'b', 'c')
('a', 'c', 'c')
('b', 'b', 'b')
('b', 'b', 'c')
('b', 'c', 'c')
('c', 'c', 'c')
```

#### 迭代多个序列

```python
xpts = [1, 5, 4, 2, 10, 7]
ypts = [101, 78, 37, 15, 62, 99]
for x, y in zip(xpts, ypts):
     print(x,y)
1 101
5 78
4 37
2 15
10 62
7 99

#################
a = [1, 2, 3]
b = ['w', 'x', 'y', 'z']
for i in zip(a,b):
    print(i)

(1, 'w')
(2, 'x')
(3, 'y')

```

#### 将多列数据排序后得到一列

```python
import heapq
a = [1, 4, 7, 10]
b = [2, 5, 6, 11]
for c in heapq.merge(a, b):
    print(c)

1
2
4
5
6
7
10
11
```

