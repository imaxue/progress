
import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
// 按需加载要走的组件
import Bundle from './Bundle';

//这是主页面
import App from '../js/App';


//  按需加载的组件用Bundle组件包裹一下
const One = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('../js/One')
    }, 'One')}>
        {(One) =>< One {
            ...props
        } />}
    </Bundle>
)

const Two = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('../js/Two')
    }, 'Two')}>
        {(Two) =>< Two {
            ...props
        } />}
    </Bundle>
)

const Next = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('../js/Next')
    }, 'Next')}>
        {(Next) =>< Next {
            ...props
        } />}
    </Bundle>
)



class Routers extends Component {
    render() {
        return (
            <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/one" component={One}/>
            <Route path="/one/next" component={Next}/>
            <Route path="/two" component={Two}/>
        </Switch>
        );
    }
}

export default Routers;
