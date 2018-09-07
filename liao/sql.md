# demo
多表联查
```js
const query = [`SELECT user.*, activity.desc as activity_name, award.config as coupon_id
        FROM user_award user, lottery_activity activity, lottery_award award
        where user.activity_id = activity.id and user.award_id = award.id 
        and user.activity_id = ${activity_id}`];
```
查全部  
```js
let countquery = ['SELECT count(*) as total from user_award'];
```
