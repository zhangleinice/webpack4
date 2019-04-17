import avatar from './assets/24npgmv.jpg';
// import  styles from './assets/index.less';
import './assets/index.less';
// 写业务逻辑
// "useBuiltIns": "usage"设置后，这段代码也可以去掉
// import "@babel/polyfill";

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        console.log(_.join(["xxx", "yyy", "zzz"], "***"))
    }
    render() {
        return (
            <div>hello react!</div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));

// export default App;

// babel test
const arr = [
    new Promise(() => {}),
    new Promise(() => {})
];
arr.map(item => {
    console.log('object');
})


const render = () => {
    const dom = document.getElementById('root');
    const div = document.createElement('div');
    const icon = document.createElement('div');
    const img = new Image();
    img.src = avatar;
    img.classList.add('avatar');
    icon.innerHTML = '<div class="iconfont iconfood-doughnut c-color-yellow c-font-20"></div>'
    
    div.innerHTML = 'webpack4';
    dom.append(div);
    dom.append(img);
    dom.append(icon);
}

// render();