import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

import { counter, addGun, removeGun, addGunAsync } from './index.redux'
import logo from './logo.svg';
import './App.css';

const mapStatetoProps = (state)=>{
  return {num:state}
}
const actionCreaters = {counter, addGun, removeGun, addGunAsync}

// 装饰器配置失败
// @connect(mapStatetoProps, actionCreaters)
class App extends Component {
  componentDidMount(){
    console.log('app组件挂载成功')
    axios.get('/hello')
      .then(res=>{
        console.log('请求成功',res)
      })
      .catch(err=>{
        console.log('请求失败',err)
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>当前武器数量{this.props.num}</h1>
          <button onClick={this.props.addGun}>申请武器</button>
          <button onClick={this.props.removeGun}>上交武器</button>
          <button onClick={this.props.addGunAsync}>拖两天再给</button>
        </header>
      </div>
    );
  }
}

App = connect(mapStatetoProps, actionCreaters)(App)
export default App;
