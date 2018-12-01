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
