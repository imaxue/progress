import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Two from './Two';

class App extends React.Component {
    render() {
        return (
            <div>
                <span>这是第一页</span>
                <Link to="/one/one2">one2</Link>
                <Router>
                    <Route path="/one/one2" component={Two}/>
                </Router>
            </div>
        )

    }
}

export default App;