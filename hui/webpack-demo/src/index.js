import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';


// 引入antd css
import 'antd/dist/antd.css'
// 直接引入的组件
import Routers from './router/routers';


// 引入css
import './css/index.css';

// 正常写法
class Reactroot extends React.Component {
    render() {
        return (
            <Router >
                <div>
                    {/* <ul>
                        <li>
                            <Link to="/">App</Link>
                        </li>
                        <li>
                            <Link to="/one">one</Link>
                        </li>
                        <li>
                            <Link to="/two">two</Link>
                        </li>
                    </ul> */}

                    {/* <hr/> */}
                  <Routers />
                </div>
            </Router>
        )
    }
}
ReactDOM.render(
    <Reactroot/>, document.getElementById("APP"))