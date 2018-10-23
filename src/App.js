import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const store = this.props.store
    const addGun = this.props.addGun
    const removeGun = this.props.removeGun
    const num = store.getState()
    console.log('app的props',this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>当前武器数量{num}</h1>
          <button onClick={()=>{store.dispatch(addGun())}}>申请武器</button>
          <button onClick={()=>{store.dispatch(removeGun())}}>上交武器</button>
        </header>
      </div>
    );
  }
}

export default App;
