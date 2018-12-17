!function () {


    /**
     * 对比两个虚拟 dom 的区别
     * @param oldTree
     * @param newTree
     */
    function diff(oldTree, newTree) {
        var index = 0;
        var patches = {}; // 补丁对象
        dfsWalk(oldTree, newTree, index, patches);
        return patches;
    }

    /**
     * 深度遍历
     * @param oldNode
     * @param newNode
     * @param index
     * @param patches
     */
    function dfsWalk(oldNode, newNode, index, patches) {
        var currentPatch = [];


        if (newNode === null) {
            // Node 将被移除.
        } else if (_.isString(oldNode) && _.isString(newNode)) {
            if (newNode !== oldNode) {
                currentPatch.push({type: patch.TEXT, content: newNode})
            }

        } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
            // 如果 Nodes 相同, 则比较 props 和 children
            // Diff props
            var propsPatches = diffProps(oldNode, newNode);
            if (propsPatches) {
                currentPatch.push({type: patch.PROPS, props: propsPatches})
            }

            diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
        } else {
            // node类型不同, 直接替换
            currentPatch.push({type: patch.REPLACE, node: newNode})
        }

        if (currentPatch.length) {
            // 保存补丁
            patches[index] = currentPatch
        }
    }

    /**
     * 对比子元素的不同
     * @param oldChildren
     * @param newChildren
     * @param index
     * @param patches
     * @param currentPatch
     */
    function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
        var diffs = listDiff(oldChildren, newChildren, 'key');

        newChildren = diffs.children;

        if (diffs.moves.length) {
            var reorderPatch = {type: patch.REORDER, moves: diffs.moves};
            currentPatch.push(reorderPatch)
        }

        var leftNode = null;
        var currentNodeIndex = index;
        oldChildren.forEach(function (child, i) {
            var newChild = newChildren[i];
            currentNodeIndex = (leftNode && leftNode.count)
                ? currentNodeIndex + leftNode.count + 1
                : currentNodeIndex + 1;

            dfsWalk(child, newChild, currentNodeIndex, patches);
            leftNode = child
        })
    }

    /**
     * 对比属性的区别
     * @param oldNode
     * @param newNode
     * @returns {null}
     */
    function diffProps(oldNode, newNode) {
        var count = 0; // 值不同的属性个数
        var oldProps = oldNode.props;
        var newProps = newNode.props;

        var key, value;
        var propsPatches = {};

        // 遍历旧属性, 替换为新值
        for (key in oldProps) {
            value = oldProps[key];
            if (newProps[key] !== value) {
                count++;
                propsPatches[key] = newProps[key]
            }
        }

        // 遍历新属性, 把旧属性中没有的值添加到补丁中
        for (key in newProps) {
            value = newProps[key];
            if (!oldProps.hasOwnProperty(key)) {
                count++;
                propsPatches[key] = newProps[key]
            }
        }

        // 如果没有属性不同, 直接返回 null
        if (count === 0) {
            return null
        }

        return propsPatches
    }

    window.diff = diff

}();