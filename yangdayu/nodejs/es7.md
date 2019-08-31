##### 生成器函数 generator Fanction

		function * makeIterator(arr) {
			for (let i=0; i< arr.length; i++) {
				yeild arr[i]
			}
		}
		const gen = makeIterator(['a', 'b', 'c'])
		console.log(gen.next());	// { value: 'a', done: false }
		console.log(gen.next());	// { value: 'b', done: false }
		console.log(gen.next());	// { value: 'c', done: false }		console.log(gen.next());	// { value: undefined, done: true }		
> 对应迭代器实现

		const makeIterator(arr) {
			let nextIndex = 0;
			return {
				next: () => {
					if(nextIndex < arr.length) {
						return {value: arr[nextIndex++], done: false}
					}else {
						return { done: true }
					}
				}
			}
		}

> co 
> 传入generator转成promise

	onst co = require('co');
	const fetch = require('node-fetch');

	co(function *() {
    	const res = yield fetch('https://api.douban.com/v2/movie/1291843');
    	const movie = yield res.json();
    	const summary = movie.summary;

    	console.log('summary', summary)
	});