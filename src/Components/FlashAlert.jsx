import React, { Component } from 'react'
import { Alert } from 'reactstrap';
function FlashAlert({message,color}){
    return (
        <div id="message" style={message !== "" ? {display : "flex" } : {display : "none"}}>
            <div className="col-5" >
              <Alert color={color} fade={true}>
                    {message}
                </Alert>
            </div>
    </div>
    )
}

export default FlashAlert
