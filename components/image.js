import React from 'react'
import DynamicComponent from './dynamic-component'
const Image = ({blok}) => {
    return (
        <div className="image" >
            <img src={blok.image} style={{width: "300px"}}/>
            <p>{blok.description}</p>
        </div>
    )
}

export default Image
