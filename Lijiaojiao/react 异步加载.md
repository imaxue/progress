# 1.index.js
```
//截取一部分 
import AsyncComponent from './AsyncComponent'

const OutsideData = () => import('./OutsideData');
//箭头函数，OutsideData是一个函数

 this.setState({
         RealOutsideData:AsyncComponent(OutsideData)
       })
```


# 2.AsyncComponent.js

```
import React from 'react'
import AsyncBundle from './AsyncBundle'

const AsyncComponent = Comp => {
    return props => (
        <AsyncBundle load={Comp}>      -----comp是个函数
            {(Mod) => (<Mod {...props}/>)}
        </AsyncBundle>
    )
}

export default AsyncComponent;
```

# 3.AsyncBundle

```
import React from "react";
import PropTypes from "prop-types";

/**
 * copy from https://segmentfault.com/a/1190000009539836
 */
class AsyncBundle extends React.Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };
    //mod是个对象，空的时候写Null，不能写''

    componentWillMount() {
        // 加载初始状态
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    load(props) {
        // 重置状态
        this.setState({
            mod: null
        });
        // 传入组件的组件----load（）是传入的文件
        props.load().then(mod => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
                //传入文件有default就用，没有就取整个文件
            });
        });
    }

    render() {
        // if state mode not undefined,The container will render children
        return this.state.mod ? this.props.children(this.state.mod) : null;
        //this.props.children  是 {(Mod) => (<Mod {...props}/>)} 
    }
}

AsyncBundle.propTypes = {
    load: PropTypes.func,
    children: PropTypes.func
};

export default AsyncBundle;

```
