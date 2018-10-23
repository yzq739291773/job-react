import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import demo_redux from './demo/demo-redux.js'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { counter, addGun, removeGun, addGunAsync } from './index.redux'

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

{ /* ReactDOM.render( < App / > , document.getElementById('root')); */ }

function render() {
    ReactDOM.render( <
        App store = { store }
        addGun = { addGun }
        removeGun = { removeGun }
        addGunAsync = { addGunAsync }
        / > , document.getElementById('root'));
    }

    render()
    store.subscribe(render)


    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();