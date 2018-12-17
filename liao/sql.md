# demo
多表联查
```js
let {activity_id = 1, pageSize = 15, page = 1} = params;
    const query = [`SELECT user.*, activity.desc as activity_name, award.config as coupon_id
        FROM user_award user, lottery_activity activity, lottery_award award
        where user.activity_id = activity.id and user.award_id = award.id 
        and user.activity_id = ${activity_id}`];
    let countquery = ['SELECT count(*) as total from user_award'];
    
    
    page = Math.max(page - 1, 0);
    const offset = pageSize * page;
    
    
    
    query.push(`order by draw_time desc limit ${offset},${pageSize}`)
    
    const querysql = query.join(' ');
    const countsql = countquery.join(' ');
    //console.log(sql);
    const total = await db.query(countsql);
    // console.log(total[0])
    let list = await db.query(querysql);
```

左联

```sql
select shop_service.service_id,shop_service.name,shop_service_goods.gid ,shop_service.merchant_id,
shop_goods.name 
from shop_service 
left join shop_service_goods on 
(shop_service.service_id = shop_service_goods.service_id) 
left join shop_goods on (shop_service_goods.gid = shop_goods.gid)
where shop_service.merchant_id = 0
```


