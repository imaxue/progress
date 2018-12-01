!function () {

    var REPLACE = 0;
    var REORDER = 1;
    var PROPS = 2;
    var TEXT = 3;

    /**
     * 执行补丁操作
     * @param node
     * @param patches
     */
    function patch(node, patches) {
        var walker = {index: 0};
        dfsWalk(node, walker, patches)
    }

    /**
     * 深度遍历
     * @param node
     * @param walker
     * @param patches
     */
    function dfsWalk(node, walker, patches) {
        var currentPatches = patches[walker.index];

        var len = node.childNodes
            ? node.childNodes.length
            : 0;

        // 先遍历子元素
        for (var i = 0; i < len; i++) {
            var child = node.childNodes[i];
            walker.index++;

            dfsWalk(child, walker, patches)
        }

        if (currentPatches) {
            applyPatches(node, currentPatches)
        }
    }

    /**
     * 应用补丁
     * @param node
     * @param currentPatches
     */
    function applyPatches(node, currentPatches) {
        currentPatches.forEach(function (currentPatch) {
            switch (currentPatch.type) {
                case REPLACE:
                    var newNode = (typeof currentPatch.node === 'string')
                        ? document.createTextNode(currentPatch.node)
                        : currentPatch.node.render();
                    node.parentNode.replaceChild(newNode, node);
                    break;
                case REORDER:
                    reorderChildren(node, currentPatch.moves);
                    break;
                case PROPS:
                    setProps(node, currentPatch.props);
                    break;
                case TEXT:
                    node.textContent = currentPatch.content
                    break;
                default:
                    throw new Error('Unknown patch type ' + currentPatch.type)
            }
        })
    }

    /**
     * 设置 props
     * @param node
     * @param props
     */
    function setProps(node, props) {
        for (var key in props) {
            if (props[key] === null) {
                node.removeAttribute(key)
            } else {
                _.setAttr(node, key, props[key])
            }
        }
    }

    /**
     * 子元素顺序改变
     * @param node
     * @param moves
     */
    function reorderChildren(node, moves) {
        var staticNodeList = _.toArray(node.childNodes);
        var maps = {};

        staticNodeList.forEach(function (node) {
            if (node.nodeType === 1) {
                var key = node.getAttribute('key');
                if (key) {
                    maps[key] = node
                }
            }
        });

        moves.forEach(function (move) {
            var index = move.index;
            if (move.type === 0) {
                // 移除元素
                if (staticNodeList[index] === node.childNodes[index]) {
                    node.removeChild(node.childNodes[index])
                }
                staticNodeList.splice(index, 1)
            } else if (move.type === 1) {
                // 插入元素
                var insertNode = maps[move.item.key]
                    ? maps[move.item.key].cloneNode(true)
                    : (typeof move.item === 'object')
                        ? move.item.render()
                        : document.createTextNode(move.item);
                staticNodeList.splice(index, 0, insertNode);
                node.insertBefore(insertNode, node.childNodes[index] || null)
            }
        })
    }

    patch.REPLACE = REPLACE;
    patch.REORDER = REORDER;
    patch.PROPS = PROPS;
    patch.TEXT = TEXT;

    window.patch = patch

}();