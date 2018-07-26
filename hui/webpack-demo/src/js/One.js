import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route, Link} from 'react-router-dom';



class One extends Component {
    render() {
        return (
            <div>
               <div> 这是one</div>
               <Link to="/one/next">next</Link>
            </div>
        );
    }
}

export default One;
