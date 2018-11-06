import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// 测试自己写的redux
import demo_redux from './demo/demo-redux.js'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
// import { addGun, removeGun, addGunAsync } from './index.redux'
import { counter } from './index.redux'
import './config'

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

// 1.react 原始代码


{ /* ReactDOM.render( < App / > , document.getElementById('root')); */ }

// 2.手动连接react和redux

// function render() {
//     ReactDOM.render( <
//         App store = { store }
//         addGun = { addGun }
//         removeGun = { removeGun }
//         addGunAsync = { addGunAsync }
//         / > , document.getElementById('root'));
//     }

//     render()
//     store.subscribe(render)

// 3.利用react-redux插件连接redux和react
ReactDOM.render( <
    Provider store = { store } >
    <
    App / >
    <
    /Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();