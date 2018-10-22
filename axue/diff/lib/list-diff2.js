!function() {
    /**
     * 比较两个 list, 算法复杂度 O(N)
     * @param {Array} oldList - 旧 list
     * @param {Array} newList - 新的 list
     */
    function diff (oldList, newList, key) {
        // 有 key, 放到 keyIndex 对象里, 没有 key 放到 free 里
        var oldMap = makeKeyIndexAndFree(oldList, key);
        var newMap = makeKeyIndexAndFree(newList, key);

        var newFree = newMap.free;

        var oldKeyIndex = oldMap.keyIndex;
        var newKeyIndex = newMap.keyIndex;

        var moves = [];
        var children = [];
        var i = 0;
        var item;
        var itemKey;
        var freeIndex = 0;

        // 检查是否存在旧list中, 没有则移除
        while (i < oldList.length) {
            item = oldList[i];
            itemKey = getItemKey(item, key);

            if (itemKey) {
                if (!newKeyIndex.hasOwnProperty(itemKey)) {
                    children.push(null)
                } else {
                    var newItemIndex = newKeyIndex[itemKey];
                    children.push(newList[newItemIndex])
                }
            } else {
                var freeItem = newFree[freeIndex++];
                children.push(freeItem || null)
            }
            i++
        }

        var simulateList = children.slice(0);

        // 移除不复存在的 items
        i = 0;
        while (i < simulateList.length) {
            if (simulateList[i] === null) {
                remove(i);
                removeSimulate(i)
            } else {
                i++
            }
        }

        var j = i = 0;
        while (i < newList.length) {
            item = newList[i];
            itemKey = getItemKey(item, key);

            var simulateItem = simulateList[j];
            var simulateItemKey = getItemKey(simulateItem, key);

            if (simulateItem) {
                if (itemKey === simulateItemKey) {
                    j++
                } else {
                    // 新的 item, 插入
                    if (!oldKeyIndex.hasOwnProperty(itemKey)) {
                        insert(i, item)
                    } else {
                        var nextItemKey = getItemKey(simulateList[j + 1], key);
                        if (nextItemKey === itemKey) {
                            remove(i);
                            removeSimulate(j);
                            j++
                        } else {
                            insert(i, item)
                        }
                    }
                }
            } else {
                insert(i, item)
            }

            i++
        }

        function remove (index) {
            var move = {index: index, type: 0};
            moves.push(move)
        }

        function insert (index, item) {
            var move = {index: index, item: item, type: 1};
            moves.push(move)
        }

        function removeSimulate (index) {
            simulateList.splice(index, 1)
        }

        let result = {
            moves: moves,
            children: children
        }

        return result
    }

    /**
     * 把 list 数组 转为 key - value 形式
     * @param {Array} list
     * @param {String|Function} key
     */
    function makeKeyIndexAndFree (list, key) {
        var keyIndex = {};
        var free = [];// 没有 key 的对象, 放到 free 数组中
        for (var i = 0, len = list.length; i < len; i++) {
            var item = list[i];
            var itemKey = getItemKey(item, key);
            if (itemKey) {
                keyIndex[itemKey] = i
            } else {
                free.push(item)
            }
        }
        return {
            keyIndex: keyIndex,
            free: free
        }
    }

    function getItemKey (item, key) {
        if (!item || !key) return null;
        return typeof key === 'string'
            ? item[key]
            : key(item)
    }

    window.makeKeyIndexAndFree = makeKeyIndexAndFree; // exports for test
    window.listDiff = diff

}();