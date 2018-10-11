##### number 1

> 在运行一段奇葩夹杂npm或外来的sdk时，找不到在哪里赋值了多少遍cow.currentFile时，这个方法很nice，不论代码藏多深

	Object.defineProperties(cow, {
		currentFile: {
			get() {
				return currentFile
			},
			set() {
				console.warn('setting currentFile')
			}
		}
	})