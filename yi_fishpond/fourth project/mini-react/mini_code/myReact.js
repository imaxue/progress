// component工厂 用来返回一个component的实例
function instantiateReactComponet(node){
    // 文本或者数字元素
    if(typeof node === 'string' || typeof node === 'number') {
        return new ReactDOMTextComponent(node);
    }

    //浏览器默认节点情况
    if (typeof node === 'object' && typeof node.type === 'string') {
        // 返回新的浏览器默认节点的类型。
        return new ReactDOMComponent(node);
    }

    //自定义的节点， <App/> react组件。 也是createElement
    if (typeof node === 'object' && typeof node.type === 'function'){
        return new ReactCompositeComponent(node);
    }
}

// 定义文本组件的构造函数， 在完整的React 渲染、更新、删除... 这些操作应该都有。
function ReactDOMTextComponent(text) {
    // 存储当前的字符串内容
    this._currentElement = '' + text;
    // 用来标识当前component属性。
    this._rootNodeID = null;
}

// 处理渲染。
ReactDOMTextComponent.prototype.mountComponent = function(rootID){
    this._rootNodeID = rootID;
    // 返回一段DOM标签。
    return '<div data-reactid="'+ rootID +'">' + this._currentElement + '</div>'
}

ReactDOMTextComponent.prototype.receiveComponent = function(nextText){
    var nextStringText = '' + nextText;
    // 跟以前保存的字符串比较
    if (nextStringText !== this._currentElement) {
        this._currentElement = nextStringText;
        // 替换整个节点
        $('[data-reactid="' + this._rootNodeID + '"]').html(this._currentElement);
    }
}


// 定义默认DOM节点。
function ReactDOMComponent(element) {
    this._currentElement = element;
    this._rootNodeID = null;
}

ReactDOMComponent.prototype.mountComponent = function(rootID){
    this._rootNodeID = rootID;
    var props = this._currentElement.props;
    var tagOpen = '<' + this._currentElement.type; // 这里还有 props, children需要添加。
    var tagClose = '</' + this._currentElement.type + '>';

    //加上reactid标识
    tagOpen += ' data-reactid=' + this._rootNodeID;

    // 拼凑出属性
    for (var propKey in props) {
        // 可能是on+event 这样的事件绑定。
        if ( /^on[A-Za-z]/.test(propKey)) {
            // 后面用jQuery来做事件绑定
            var eventType = propKey.replace('on','').toLowerCase();
            // 只能做事件代理。因为DOM元素现在还是不存在的。
            $(document).on(eventType, '[data-reactid="'+ this._rootNodeID +'"]', props[propKey]);
        }

        // 可能是单纯属性。 id、 name、 type、 style等等。
        if(props[propKey] && propKey != 'children' && !/^on[A-Za-z]/.test(propKey)) {
            if(typeof props[propKey] === "object") {
                var innerHTMl = '';
                for(var innerKey in props[propKey]) {
                    var context  = innerKey;
                    for (var j = innerKey.length -1; j >0; j--){
                        var c = innerKey.charAt(j);
                        if(c >= 'A' && c <= 'Z'){
                            //记录出现大写字符的位置。 slice, substirng
                            context = context.substring(0,j) + '-' + context.substring(j, j+1).toLowerCase() + context.substring(j+1);
                        }
                    }
                    var endChar = ';'
                    if (typeof props[propKey][innerKey] === 'number'){
                        endChar = 'px' + endChar;
                    }
                    innerHTMl += context + ':' + props[propKey][innerKey] + endChar
                }
                tagOpen += ' ' + propKey + '=' + innerHTMl;
            } else {
                tagOpen += ' ' + propKey + '=' + props[propKey];
            }
        }
    }

    // 获取子节点渲染的内容
    var content = '';
    var children = props.children || [];

    var childrenInstances = []; //用于保存所有的子节点的component实例。
    var that = this;

    $.each(children, function(key, child) {
        var childComponentInstance = instantiateReactComponet(child);
        // key 是不是 就是见到的 reactid = 0.1，0.0.2
        childComponentInstance._mountIndex = key;
        childrenInstances.push(childComponentInstance);

        var curRootId = that._rootNodeID + '.' + key;
        var childHtml = childComponentInstance.mountComponent(curRootId);

        content  += '' + childHtml;
    })  

    // 留给以后更新时使用。 暂时先不管。
    this._renderedChildren = childrenInstances

    return tagOpen + '>' + content + tagClose;
}

ReactDOMComponent.prototype.receiveComponent = function(nextElement){
    console.log(nextElement);
    // 更新子节点
    this._updateDOMChildren(nextElement.props.children);
}

ReactDOMComponent.prototype._updateDOMChildren = function(nextChildrenElement){
    var content = '', that = this;
     $.each(nextChildrenElement, function(key, child) {
        var childComponentInstance = instantiateReactComponet(child);
        // key 是不是 就是见到的 reactid = 0.1，0.0.2
        childComponentInstance._mountIndex = key;

        var curRootId = that._rootNodeID + '.' + key;
        var childHtml = childComponentInstance.mountComponent(curRootId);

        content  += '' + childHtml;
    });
    console.log(content);  
    document.getElementById('root').innerHTML = content;
}

// 自定义React组件元素类
function ReactCompositeComponent(element){
    this._currentElement = element;
    this._rootNodeID = null;

    //存放对应的ReactClass实例
    this._instance = null;
}

ReactCompositeComponent.prototype.mountComponent = function(rootID){
    this._rootNodeID = rootID;
    // 拿到当前元素对应的属性值
    var publicProps = this._currentElement.props;
    // 拿到对应的ReactClass
    var ReactClass = this._currentElement.type; // Constructor
    // 初始化类，传入参数publicProps得到实例
    var inst = new ReactClass(publicProps);
    this._instance = inst;
    // 保留对当前Componet的引用，在后面更新会用到。
    inst._that = this;

    if (inst.componentWillMount) {
        inst.componentWillMount();
    }

    //调用ReactClass的实例的render方法，返回一个element或者一个文本节点。
    var renderedElement = this._instance.render();

    var renderComponetInstance = instantiateReactComponet(renderedElement);
    this._renderComponent = renderComponetInstance //存起来

    // 拿到需要渲染的字符串内容
    var renderedHtml = renderComponetInstance.mountComponent(this._rootNodeID);
    
    $(document).on('mountReady', function(){
        inst.componentDidMount && inst.componentDidMount();
    })

    return renderedHtml;
}

ReactCompositeComponent.prototype.receiveComponent = function(nextElement, newState){
    // 如果接受了新的组件，那使用最新的element
    this._currentElement = nextElement || this._currentElement;

    var inst = this._instance
    // 合并
    var nextState = $.extend(inst.state, newState);
    var nextProps = this._currentElement.props;

    //改写state
    inst.state = nextState;
    if (inst.shouldComponentUpdate && (inst.shouldComponentUpdate(nextProps, nextState) === false)) return;

    // componentWillUpdate
    if (inst.componentWillUpdate) inst.componentWillUpdate(nextProps, nextState) 

    // 获取之前的渲染实例
    var prevComponentInstance = this._renderComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;

    // 重新执行render拿到对应的新element
    var nextRenderElement = this._instance.render();
    // 判断新的element和旧的元素比较，判断是否需要重渲染true，还是直接替换false
    if (_shouldUpdateReactComponent(prevRenderedElement, nextRenderElement)){
        // 如果需要更新，就继续调用子节点的receiveComponent方法，传入新的element更新子节点
        prevComponentInstance.receiveComponent(nextRenderElement);
        // 调用componentDidUpdate 表示更新完成
        inst.componentDidUpdate && inst.componentDidUpdate();
    } else {
        // 如果发现是完全不同的两种element，就替换。
        var thisID = this._rootNodeID;
        // 重新new一个对应的Component。
        this._renderComponent = this.instantiateReactComponet(nextRenderElement);
        // 重新生成对应的元素内容
        var nextHtml = this._renderComponent.mountComponent(thisID);
        // 替换整个节点
        $('[data-reactid=' + this._rootNodeID + ']').replaceWith(nextHtml);
    }
}

// 新旧节点 type类型是否相同。
function _shouldUpdateReactComponent(prevRenderedElement,nextRenderElement){
    if(prevRenderedElement != null && nextRenderElement != null){
        var prevType = typeof prevRenderedElement;
        var nextType = typeof nextRenderElement;

        if (prevType === 'string' || prevType === 'number') {
            return nextType === 'string' || nextType === 'number'
        } else {
            return nextType === 'object' && prevRenderedElement.type === nextRenderElement.type && prevRenderedElement.key === nextRenderElement.key;
        }
    }
    return false;
}


// ReactElement就是虚拟DOM的概念，具有一个 type属性代表当前的节点类型，还有节点属性props
// 对于div这样的节点， type就是div，props就是attributes, key用来标识这个element（使用与DIFF算法那比较的时候）
function ReactElement(type, key, props) {
    this.type = type;
    this.key = key;
    this.props = props;
}


const ReactDOM = {
    nextReactRootIndex: 0,
    render: function(element, container){
        var componentInstance = instantiateReactComponet(element);
        var html = componentInstance.mountComponent(ReactDOM.nextReactRootIndex++);
        container.innerHTML = html; 
        $(document).trigger('mountReady');
    }
}

const React = {
    // 把出入的内容做一个处理，处理成能被ReactElement类接收的参数形式。
    createElement: function(type, config, children){
        var props = {}, propName;
        config = config || {};

        // 方便以后高效的更新，第一节课这个属性暂时不管。
        var key = config.key || null;

        // 复制config里的内容到props
        for(propName in config) {
            if (config.hasOwnProperty(propName) && propName !== 'key') {
                props[propName] = config[propName];
            }
        }

        // 处理Children，全部挂载到props的children属性上。
        // 得到所有子元素对象的长度。
        var childrenLength = arguments.length - 2; 
        if (childrenLength === 1) {
            props.children = $.isArray(children) ? children : [children];
        } else if(childrenLength > 1) {
            var childArray = new Array(childrenLength);
            for (var i =0; i < childrenLength; i++) {
                childArray[i] = arguments[i+2];
            }
            props.children = childArray;
        }

        return new ReactElement(type, key, props);
    },
    createReactClass: function(spec){
        // 生成一个子类
        var Constructor = function(props){
            this.props = props;
            this.state = this.getInitialState ? this.getInitialState() : null;
        }

        //原型继承，继承超级父类
        Constructor.prototype = new ReactClass();
        Constructor.prototype.constructor = Constructor;

        // 混入spec到原型
        $.extend(Constructor.prototype, spec);
        return Constructor;
    }
}

// 定义ReactClass类，所有自定义的超级父类. super()
var ReactClass = function(){}
// 预留render方法让子类去继承覆盖。
ReactClass.prototype.render = function(){} 

ReactClass.prototype.setState = function(newState){
    // this._that 代表了对应ReactCompositeComponet实例的引用。
    this._that.receiveComponent(null, newState);
}
