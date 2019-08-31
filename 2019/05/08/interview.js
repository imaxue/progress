/**
 * call 的生js实现：改变this，并执行
 */
Function.prototype.callImitator = function(context = window){  //context = window 如果.call(null) this指向window
    context.fn = this;  // 获取调用call的函数，就是this
    let args = [...arguments].slice(1)
    context.fn(args);
    delete context.fn;
}

let foo = {
    value: 1,
}

let bar = function(){
    console.log(this.value)
}

bar.callImitator(foo)   // 1

/**
 * apply 的生js实现
 */
Function.prototype.applyImitator = function(context = window, rest){
    context.fn = this;
    context.fn(...rest);
    delete context.fn;
}


/**
 * new 的实现机制
 */

function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.toPrint = function(){
    return this.name + '-' + this.age;
}

let student = new Person('小名', 28);

student.toPrint() // 小名-28
student.name    // 小名
student.age     // 28

// new，使student继承了Person的属性和方法，并且返回一个新对象。
function newImitator(){
    let obj = Object.create();
    let Person = Array.prototype.shift.call(arguments);
    obj.__proto__ = Person.prototype;   // 让obj的原型指向构造函数，这样obj就可以访问到Person的属性
    Person.apply(obj, arguments)        // 让this指向指给obj
    return obj;
}

let teacher = newImitator(Person, 'Ms.z', 30)
teacher.toPrint() // Ms.z-30
teacher.name    // Ms.z


/**
 * instanceof 是通过原型链判断的，A instanceof B,在A原型链中层层查找，是否有原型等于B.__proto__,直到顶端（null,即Object.prototype.__proto__ ,）那么返回false；
 * instanceof 可以准确判断复杂数据类型，但不能正确判断基本数据类型
 * 实现代码 L instanceof R
 * L.constructor == R
 * L.__proto__ == R.prototpe
 */
function instance_of(L, R){
    let O = R.prototype
    L = L.__proto__;
    while(true){
        if(L === null){
            return false;
        }else if(L === O){
            return true;
        }
        L = L.__proto__; //继续上一层原型查找
    }
}
