import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
// 按需加载要走的组件
import Bundle from './router/Bundle';
// 直接引入的组件
import App from './js/App';
// import One from './js/One'; import Two from './js/Two'; 引入css
import './css/index.css';
//  按需加载的组件用Bundle组件包裹一下
const One = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('./js/One')
    }, 'One')}>
        {(One) =>< One {
            ...props
        } />}
    </Bundle>
)

const Two = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('./js/Two')
    }, 'Two')}>
        {(Two) =>< Two {
            ...props
        } />}
    </Bundle>
)

const Next = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('./js/Next')
    }, 'Next')}>
        {(Next) =>< Next {
            ...props
        } />}
    </Bundle>
)

// 正常写法
class Reactroot extends React.Component {
    render() {
        return (
            <Router >
                <div>
                    <ul>
                        <li>
                            <Link to="/">App</Link>
                        </li>
                        <li>
                            <Link to="/one">one</Link>
                        </li>
                        <li>
                            <Link to="/two">two</Link>
                        </li>
                    </ul>

                    <hr/>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route exact path="/one" component={One}/>
                        <Route path="/one/next" component={Next}/>
                        <Route path="/two" component={Two}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
ReactDOM.render(
    <Reactroot/>, document.getElementById("APP"))