import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from './my-redux.js'
// connect 赋值连接组件，把redux里的数据放到组件的属性里
// 1.负责接受一个组件，把state里的一些数据放进去，并返回一个组件
// 2.数据变化的时候，能够通知组件
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={})=>(WrapComponent)=>{
    return class ConnectComponent extends React.Component{
        static contextTypes = {
            store:PropTypes.object
        }
        constructor(props,context){
            super(props, context)
            this.state = {
                props:{}
            }
        }
        componentDidMount(){
            const {store} = this.context
            store.subscribe(()=>this.update())
            this.update()
        }
        update(){
            // 获取mapStateToProps和mapDispatchToProps 放入this.props里
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
            // 方法不能直接给，需要用dispatch包一层
            // 要 addGun = ()=>store.dispatch(addGun())才有意义
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
            this.setState({
                props:{
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps,
                }
            })
        }
        render(){
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}

// Provider 把store放到context里面，所有的子元素可以直接取到store
export class Provider extends React.Component{
    // 父组件声明自己支持context
    static childContextTypes = {
        store:PropTypes.object
    }
    // 提供一个函数，用来返回context对象
    getChildContext(){
        return {
            store:this.store
        }
    }
    constructor(props, context){
        super(props, context)
        this.store = props.store
    }
    render(){
        return this.props.children
    }
}