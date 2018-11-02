import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route} from 'react-router-dom'

import Login from './container/login/login.jsx'
import Register from './container/register/register.jsx'
import AuthRoute from './component/AuthRoute/AuthRoute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Boss from './container/boss/boss'
import Genius from './container/genius/genius'

import reducers from './reducer.js'
import './config'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render( 
    <Provider store = { store } >
        <BrowserRouter >
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/geniusinfo' component={GeniusInfo}></Route>
                <Route path='/boss' component={Boss}></Route>
                <Route path='/genius' component={Genius}></Route>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();