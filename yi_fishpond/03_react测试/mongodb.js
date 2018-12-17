//mongodb数据库操作学习

//连接
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task');

//三步走，Schema注册，相当于约法三章
var Schema = mongoose.Schema;
var students = new Schema({
    name : String,
    sex : String
})
mongoose.model('Student',students);  //students表明，Student模型名

// 正式交往
// 增加数据
var Student = mongoose.model('Student');
var student = new Student;
student.name = '化腾';
student.sex = 'man';
student.save(function(err){
    if(err){
        console.log(err)
        return;
    }else{
        console.log('student is saved.');
        mongoose.disconnect();
    }
})

// 更改数据
var student = mongoose.model('Student');
student.update(
    {_id : "5b0ea7dd5356fd3ce81e7a40"},
    {'name':'广州-张小龙'},
    {multi : false}, //只更新一个文档
    function(err,row_updata){  //row_updata受影响的行数
        if(err){
            console.log(err)
            return;
        }else{
            console.log(row_updata)
        }
    }
)

// 删除数据
var student = mongoose.model('Student');
student.findById('5b0ea7dd5356fd3ce81e7a40', function(err,student){
        console.log(student);
        student.remove();
    }
)

// 查询数据
var student = mongoose.model('Student');
student.find({   
    
},function(err,students){
    console.log(students)
})