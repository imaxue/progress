import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

// 按需加载要走的组件
// import Bundle from '../router/Bundle';

//  按需加载的组件用Bundle组件包裹一下
// const Next = (props)=>(
//     <Bundle load={()=>require.ensure([],function(){
//         return require('./Next')
//     },'Next')}>
//         {(Next)=><Next {...props}/>}
//     </Bundle>
// )

class One extends Component {
    render() {
        return (
            <div>
               <div> 这是one</div>
               <Link to="/one/next">next</Link>
               {/* <Route path="/one/next" component={Next}/> */}
            </div>
        );
    }
}

export default One;
