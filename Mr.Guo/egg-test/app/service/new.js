const Service = require('egg').Service;

class NewsService extends Service {
    async list(page = 1) {
        const dataList = {
            list: [
                { id: 1, title: 'this is news1', url: 'www.taobao.com', time: 1231 },
                { id: 2, title: 'this is news2', url: 'www.github.com', time: 12313 },
            ]
        };
        // const { serverUrl, pageSize } = this.config.news;

        // const { data: idList } = await this.ctx.curl(`${serverUrl}/topstries.json`, {
        //     data: {
        //         orderBy: '"$key"',
        //         startAt: `"${pageSize * (page - 1)}"`,
        //         endAt: `"${pageSize * page - 1}"`,
        //     },
        //     dataType: 'json',
        // });
        // const newsList = await Promise.all(
        //     Object.keys(idList).map(key => {
        //         const url = `${serverUrl}/item/${idList[key].json}`;
        //         return this.ctx.curl(url, {dataType: 'json'});
        //     })
        // );
        return dataList;
    }
}

module.exports = NewsService;