import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import App from './js/App';
import One from './js/One';
import Two from './js/Two';


import './css/index.css';

console.log('hello pack');
console.log("我还");

class Reactroot extends React.Component {
    // state = {     change: 'yes' } onClick = () => {     this.setState({ change:
    // this.state.change == "yes"             ? 'no'             : 'yes' }) }
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

                    <Route exact path="/" component={App}/>
                    <Route path="/one" component={One}/>
                    <Route path="/two" component={Two}/>
                </div>
            </Router>
        )
    }
}
ReactDOM.render(<Reactroot/>, document.getElementById("APP"))