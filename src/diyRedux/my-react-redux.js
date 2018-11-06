import React from 'react'
import PropTypes from 'prop-types'
// connect 赋值连接组件，把redux里的数据放到组件的属性里

export function connect(){

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