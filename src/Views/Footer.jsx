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
                
                    <Link to="/">
                        <img src="../Assets/Img/logo.png"></img>
                    </Link>
               
                <h3>Download Our App</h3>
                <a href="https://apps.apple.com/us/app/dostava/id1543132324">
                  <img src="../Assets/Img/footer-appstore.png"></img>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.dostava">
                  <img src="../Assets/Img/footer-googleplay.png"></img>
                </a>
                
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
                <li><a href="/privacy-policy">Privacy policy</a></li>
                <li><a href="/terms-of-use">Terms of use</a></li>
                <li><a href="/how-it-works">How it Works</a></li>
                <li><a href="/contact">Contact us</a></li>
                <li><a href="/faqs">FAQs</a></li>

              </ul>
            </Col>
            <Col lg="3" md="12" sm="12" xs="12" className="quickmenu">
              <h3>About Dostava</h3>
                <ul>
                  <li><a href="/our-story">Our Story</a></li>
                  <li><a href="/safety">Safety</a></li>
                  <li><a href="/blogs">Blogs</a></li>
                  <li><a href="/register-vendor">Vendors</a></li>
                  <li><a href="/register-driver">Delivery Partners</a></li>
                </ul>
            </Col>
           
            <Col lg="3" md="12" sm="12" xs="12" className="quickmenu social">
              <h3>Contact us</h3>
              <p>Perth, Australia</p>
              <Link to="mailto:support@dostava.com.au">support@dostava.com.au</Link>
              {/* <p className="pbold">Phone: +61 3 9028 4573,</p>
              <p className="pbold">0468 437851</p> */}
              <ul className="Social-links">
						<li><a href="https://www.facebook.com/dostavaApp/"><i className="fa fa-facebook-f"></i></a></li>
						<li><a href="https://twitter.com/AppDostava"><i className="fa fa-twitter"></i></a></li>
						<li><a href="https://www.youtube.com/channel/UC22i_fgulC5g-zJ_JSIH3SA"><i className="fa fa-youtube"></i></a></li>
						<li><a href="https://www.instagram.com/dostavaapp/"><i className="fa fa-instagram"></i></a></li>
					</ul>
            </Col>
          </Row>
          <Row className="copyright-area text-center">
            <Col lg="12" md="12" sm="12" xs="12">
              <p>Copyright &copy; 2021. All Rights Reserved.</p>
            </Col>
            
          </Row>
        </Container>

)
}

}

export default Footer;