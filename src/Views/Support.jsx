import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';



import ReactDOM from 'react-dom';



import { server_url } from  "../config/config";
import {
    
    Container,
   Row,
   Col
    // Link
} from "reactstrap";
import FontAwesome from 'react-fontawesome';
import { Form, FormControl } from 'react-bootstrap';
import {Link, useRouteMatch, useParams } from 'react-router-dom';




import { Redirect , useHistory  } from "react-router-dom";
import { Helmet } from "react-helmet";





function Support(props){ 
    return(
      
        <Container className="wrapper" fluid>
			<Helmet>
			<title>Support | Dostava </title>
			<meta name="description" content="" />
           
		</Helmet>
      <Header  {...props} title={"Support"} />
      <Container id="support-wrap" fluid>
            <Container className="support-head" fluid>
                <Row>
                    <Col lg="12">
                        <h2>Get in touch with us!</h2>
                    </Col>
                </Row>
            </Container>
            <Container className="support-desc" fluid>
                <Container>
                <Row>
                    <Col lg="3"></Col>
                    <Col lg="6" className="support-img">
                        <img class="img-fluid" src="../Assets/Img/support-img.png" alt="faq"></img>
                    </Col>
                    <Col lg="3"></Col>
                </Row>
                </Container>
                <Container className="support-cols" fluid>
                    <Container>
                    <Row>
                    <Col lg="4" className="support-single" >
                        <img class="img-fluid" src="../Assets/Img/live-chat.png" alt="faq"></img>
                        <h4>Live Chat</h4>
                        <p>With our customer support</p>
                    </Col>
                    <Col lg="4" className="support-single">
                        <img class="img-fluid" src="../Assets/Img/email-icon.png" alt="faq"></img>
                        <h4>Email</h4>
                        <p>support@dostava.com.au</p>
                    </Col>
                    <Col lg="4" className="support-single">
                        <img class="img-fluid" src="../Assets/Img/phone-icon.png" alt="faq"></img>
                        <h4>Phone</h4>
                        <p>+61 3 9028 4573</p>
                    </Col>
                </Row>
                    </Container>
                </Container>
                
                
            </Container>
      </Container>
      
      <Footer />

        
    </Container>
     
      
    )


}



  export default Support;