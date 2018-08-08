import React from 'react'
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';

import {Button,BackTop} from 'antd';

import '../css/app.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <div className='index-body'>
                    <div className='top-box'>
                        {/* <img className='bg-top' src={top} alt=""/> */}
                    </div>
                    <div className='box-text'>
                        <div className='logo'>Just F IT</div>
                        <span className='login'>登录</span>
                        <span className='login'>注册</span>
                        <span className='login get-more'>浏览</span>
                    </div>
                </div>
                <div className='haonan'>
                    <div className='haonan-name'>非著名退堂鼓表演艺术家</div>
                    <p className='haonan-text'>哪有什么岁月静好，不过是有人在替你负重前行罢了。</p>
                    <div className='haonan-img'></div>

                </div>
                <div className='haonan'>
                    <div className='haonan-name'>糖小面儿</div>
                    <p className='haonan-text'>在一回首间，才忽然发现，原来，我一生的种种努力，不过只为了周遭的人对我满意而已。为了搏得他人的称许与微笑，我战战兢兢地将自己套入所有的模式所有的桎梏。走到途中才忽然发现，我只剩下一副模糊的面目，和一条不能回头的路。</p>
                    <div className='haonan-img liao-img'></div>
                </div>
                <div className='haonan hui'>
                    <div className='haonan-name '>施清海</div>
                    <p className='haonan-text hui-text'>我也有段日子过的不顺心，那时候就常想，如果有人见到我这样在烂泥里打滚、爬都爬不起来的模样还能喜欢我就好了，但我也不知道会不会有这样的人，我也不敢给别人看。</p>
                    <div className='haonan-img hui-img'></div>
                </div>
                <div className='haonan'>
                    <div className='haonan-name'>Just F IT - 传销嘛 开心就好</div>
                </div>
                <div className='haonan'>
                    <div className='footer'>
                        <a href="javascript">联系我们</a><span>|</span>
                        <a href="javascript">招贤纳士</a><span>|</span>
                        <a href="javascript">风格模板</a><span>|</span>
                        <a href="javascript">官方博客</a>
                    </div>
                    <div className='footer-text'>
                    老黄版权所有　©1994-2018　没有备案 没有ICP 没有业务经营许可证 就是这么嚣张 不要问我为什么
                    </div>
                </div>
                <BackTop />
            </div>
        )
    }
}

export default App;