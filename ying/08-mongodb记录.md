#mongodb记录
>1.show collections 看所有集合
>2。切换集合 use test
>3.
>db.user.update({“username”:”john”},{$set:{"group":"program”}},{multi:true})
>db.users.update({"bb":"2"},{$set:{"aa":"11"}},{multi:true})
>multi:true选中全部符合条件的删除，{$set:{"group":"program”}} 指定哪个参数清除掉哪个
>4.
>db.user.save({“_id”:"ObjectId(“55kdsjk”)","group":"program”})
>db.users.save({"_id":ObjectId("5b09569b0f07a2e85c4d976f"),"aa":"1","bb":"2","cc":"3"})
>"group":”program” save 会把后面所有参数全替换
>5.删除
>db.users.remove()删除文档 不删除索引
>db.users.drop() 删除所有的文档与索引



