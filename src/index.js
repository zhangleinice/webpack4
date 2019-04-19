import avatar from './assets/24npgmv.jpg';
// import  styles from './assets/index.less';
import './assets/index.less';
// 写业务逻辑
// "useBuiltIns": "usage"设置后，这段代码也可以去掉
// import "@babel/polyfill";

import React, { Component } from 'react';
import ReactDom from 'react-dom';
// import _ from 'lodash';
import { add } from './common/index.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        // console.log(_.join(["xxx", "yyy", "zzz"], "***"))
        console.log(add(1, 2));
    }
    render() {
        return (
            <div>hello react!</div>
        );
    }
}

// ReactDom.render(<App/>, document.getElementById('root'));

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

// 懒加载
// function getComponent() {
//     return import('lodash').then(() => {
//         var ele = document.createElement('div');
//         ele.innerHTML = _.join(['hello', 'react'], '----')
//         return ele;
//     })
// }

// document.addEventListener('click', () => {
//     getComponent().then(ele => {
//         document.body.appendChild(ele)
//     })
// })

// 异步加载lodash
async function getComponent() {
	const { default: _ } = await import(/* webpackChunkName:"lodash" */'lodash');
	const element = document.createElement('div');
	element.innerHTML = _.join(['Dell', 'Lee'], '-');
	return element;
}

document.addEventListener('click', () =>{
	getComponent().then(element => {
		document.body.appendChild(element);
	});
})