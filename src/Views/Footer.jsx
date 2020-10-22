import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import {
    Container,
    Row,
    Col
} from "reactstrap";
import {Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome'

class Footer extends React.Component{

  
    render(){

        return(
  
        <Container className="footer-area">
          <Row className="widget-area">
            <Col lg="3" md="12" sm="12" xs="12" className="footer-logo quickmenu footer-app">
                <div>
                    <Link to="/">
                        <img src="../Assets/Img/logo.png"></img>
                    </Link>
                </div>
                <h3>Download Our App</h3>
              <img src="../Assets/Img/footer-appstore.png"></img>
              <img src="../Assets/Img/footer-googleplay.png"></img>
                
            </Col>
            <Col lg="3" md="12" sm="12" xs="12" className="quickmenu">
              <h3>Links</h3>
              {/* <ul>
                <li><Link to="/about">Home</Link></li>
                <li><Link to="/about">Pricing</Link></li>
                <li><Link to="/about">Download</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/about">Service</Link></li>
              </ul> */}
              <ul>
                <li><a href="https://dostava.com.au/privacy-policy">Privacy policy</a></li>
                <li><a href="https://dostava.com.au/terms-of-use">Terms of use</a></li>
                <li><a href="https://dostava.com.au/how-it-works">How it Works</a></li>
                <li><a href="https://dostava.com.au/contact">Contact us</a></li>
                <li><a href="https://dostava.com.au/faqs">FAQs</a></li>
              </ul>
            </Col>
            <Col lg="3" md="12" sm="12" xs="12" className="quickmenu">
              <h3>Services</h3>
                <ul>
                  <li><Link to="/about">Home Delivery</Link></li>
                  <li><Link to="/about">Free of cost</Link></li>
                  <li><Link to="/about">Discounts</Link></li>
                  <li><Link to="/about">Highlight Restaurants</Link></li>
                  <li><Link to="/about">Order for others</Link></li>
                  <li><Link to="/about">Earn Yourself</Link></li>
                </ul>
            </Col>
           
            <Col lg="3" md="12" sm="12" xs="12" className="quickmenu social">
              <h3>Contact us</h3>
              <p>Jalalabad 20/1</p>
              <p>Shah Farid Road</p>
              <p>+8801747913966</p>
              <Link to="mailto:getme@gmail.com">getme@gmail.com</Link>
            </Col>
          </Row>
          <Row className="copyright-area text-center">
            <Col lg="12" md="12" sm="12" xs="12">
              <p>Copyright © 2020. All Rights Reserved.</p>
            </Col>
            
          </Row>
        </Container>

)
}

}

export default Footer;