# PEEWEE

[peewee](http://docs.peewee-orm.com/) 轻量级的 Python ORM

#### 映射关系

> 模型类，字段和模型实例都映射到数据库

`Model类代表了数据库表，Field字段实例代表了数据库中的列，Model实例代表了数据库中的行`

| Object         | Corresponds to…         |
| :------------- | ----------------------- |
| Model class    | Database table          |
| Field instance | Column on a table       |
| Model instance | Row in a database table |

#### 建表

##### 第一种方法

> 先创建 model.py  然后再创建数据库

```python
from peewee import *

# 连接数据库
database = MySQLDatabase('test', user='root', host='localhost', port=3306)

# 定义Person
class Person(Model):
    name = CharField()
    birthday = DateField()
    class Meta:
        database = database
```

```python
# 创建表
Person.create_table()
```

##### 第二种方法

> 先建立数据库表，然后在创建Model

```python
# 在正确的路径下，执行下面的命令(如果数据库没有密码可以省略--password)
python -m pwiz -e mysql -u root -H localhost --password t_okex > tModel.py
```

然后输入数据库密码创建内容如下:

```python
from peewee import *

database = MySQLDatabase('t_okex', **{'charset': 'utf8', 'use_unicode': True, 'host': 'localhost', 'user': 'root'})


class UnknownField(object):
    def __init__(self, *_, **__): pass


class BaseModel(Model):
    class Meta:
        database = database

class TDayOkex(BaseModel):
    close = FloatField(null=True)
    date_time = CharField(null=True)

    class Meta:
        table_name = 't_day_okex'

```



##### 操作数据库

###### 增

```python
t = TDayOkex(close=123, date_time='2018-07-22')
t.save()
```

###### 删

```python
TDayOkex.delete().where(TDayOkex.close == 123).execute()
```

###### 改

```python
t = TDayOkex.update({TDayOkex.date_time: '2018-07-23'}).where(TDayOkex.close == 123)
t.execute()
```

###### 查

```python
t = TDayOkex.get(TDayOkex.close == 123) # 一条数据
t_list = TDayOkex.select().where(TDayOkex.close == 123)  # 多条数据
```

