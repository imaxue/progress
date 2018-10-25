!function () {
    /**
     * 虚拟dom Element.
     * @param {String} tagName 元素类型
     * @param {Object} props - Element 的属性, key-value 形式
     * @param {Array<Element|String>} children - 元素的子元素数组
     */
    function Element(tagName, props, children) {
        if (!(this instanceof Element)) {
            return new Element(tagName, props, children)
        }

        if (util.isArray(props)) {
            children = props;
            props = {}
        }

        this.tagName = tagName;
        this.props = props || {};
        this.children = children || [];
        this.key = props ? props.key : null;

        var count = 0;

        this.children.forEach(function (child, i) {
            if (child instanceof Element) {
                count += child.count
            }
            count++
        });

        this.count = count
    }

    /**
     * 将虚拟 dom 转为真实 dom
     */
    Element.prototype.render = function () {
        var el = document.createElement(this.tagName);
        var props = this.props;

        for (var propName in props) {
            var propValue = props[propName];
            util.setAttr(el, propName, propValue)
        }

        this.children.forEach(function (child) {
            var childEl = (child instanceof Element)
                ? child.render()
                : document.createTextNode(child);
            el.appendChild(childEl)
        });

        return el
    };

    window.el = Element
}();