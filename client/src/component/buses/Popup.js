import React from "react";
import { Button } from "react-bootstrap";

const Popup = props => {
  return (props.trigger) ?(
    <div className="popup-box">
      <div className="box">
        <Button  className="close-icon" onClick={props.handleClose}>x</Button>
        {props.children}
      </div>
    </div>):null
  
};

export default Popup;