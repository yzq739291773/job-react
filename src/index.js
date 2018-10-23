import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import demo_redux from './demo/demo-redux.js'
import { createStore } from 'redux'
import { counter } from './index.redux'
const store = createStore(counter)

{ /* ReactDOM.render( < App / > , document.getElementById('root')); */ }

function render() {
    ReactDOM.render( <
        App store = { store }
        / > , document.getElementById('root'));
    }

    render()
    store.subscribe(render)


    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();