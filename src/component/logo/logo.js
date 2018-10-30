import React from 'react'
import './logo.css'
import logoImg from './job.png'

class Logo extends React.Component{
    render(){
        return(
            <div className="logo-container">
                <img  src={logoImg}></img>
            </div>
        )
    }
}

export default Logo