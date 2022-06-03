import React, { Children } from "react";
import "../../styles/main.css"

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';


const Hoc=(props)=>{
    return(
       <Container className="app_container mb-5">
           {props.children}
       </Container>
    )
}

export default Hoc