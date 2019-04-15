import avatar from './assets/24npgmv.jpg';
// import  styles from './assets/index.less';
import './assets/index.less';

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

render();