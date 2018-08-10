## JavaScript实现类的private、public

https://blog.csdn.net/heyue_99/article/details/68945650
定义Js中的类，实际上用的是function，this.xxx只能定义公有属性和方法，私有方法包括里面的局部变量和新定义的方法
```
function Person(_name,_age,_sex,_salary){  
    //public  
    this.name = _name;  
    this.age = _age;  
  
    //privare  
    var sex = _sex;  
    var salary = _salary;  
  
    //public method  
    this.getName = function(){  
        return this.name;  
    }  
  
    this.getAge = function(){  
        return this.age;  
    }  
  
    //private methd  
    function getSex(){  
        return sex;  
    }  
  
    function getSalary(){  
        return salary;  
    }  
  
    this.display = function(){  
        document.write(this.getName() + "---" + this.getAge() + "---" + getSex() + "----" + getSalary());  
    }  
  
}  

```

## promise

