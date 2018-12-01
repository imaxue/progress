//Sequelize （ORM框架：Object-Relational Mapping,把关系数据库的表 映射到对象上）读写JavaScript对象，把对象变成数据库的行。
const Sequelize = require('sequelize');
const config = require('./config');

//创建Sequelize对象实例
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//定义模型 Pet，告诉Sequelize如何映射数据库表：
var Pet = sequelize.define('pet', {   //用sequelize.define()定义Modal，表明pets，  //第二个参数指定列名和数据类型
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false              //关闭自动添加timestamps功能
    });


//塞数据
var now = Date.now();

Pet.create({
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2017-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
})

    (async () => {
        var dog = await Pet.create({
            id: 'g-' + now,
            name: 'Gaffey',
            gender: false,
            birth: '2017-07-07',
            createdAt: now,
            updatedAt: now,
            version: 0
        });

        console.log('created:' + JSON.stringify(dog));
    })();

    //查询数据
    (async ()=>{
        var pets =  await Pet.findAll({
            where:{
                name:'Gaffey'
            }
        });
        console.log(`find ${pets.length} pets:`);
        for(let p of pets){
            console.log(JSON.stringify(p));
        }
    })();

    //更新数据 对查询到的实例调用save()
    (async ()=>{
        var p = await queryFromSomewhere();
        p.gender = true;
        p.updatedAt = Date.now();
        p.version ++ ;
        await p.save();
    });

    //删除数据
    (async ()=>{
        var p = await queryFromSomewhere();
        await p.destroy();
    })();
