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
  
        <Container className="footer-area" fluid>
          <Row className="widget-area">
            <Col lg="3" className="footer-logo">
                <div>
                  <img src="../Assets/Img/logo.png"></img>
                </div>
                <ul>
                  <li><Link>Home</Link></li>
                  <li><Link>Shop</Link></li>
                  <li><Link>Blog</Link></li>
                  <li><Link>Contact Us</Link></li>
                  <li><Link>About Us</Link></li>
                </ul>
            </Col>
            <Col lg="2" className="quickmenu">
              <h3>Help/Support</h3>
              <ul>
                <li><Link>About Us</Link></li>
                <li><Link>Privacy Policy</Link></li>
                <li><Link>How it works</Link></li>
                <li><Link>Contact Us</Link></li>
                <li><Link>FAQs</Link></li>
              </ul>
            </Col>
            <Col lg="3" className="quickmenu half">
              <h3>Category</h3>
                <ul>
                  <li><Link>Meets</Link></li>
                  <li><Link>Greens</Link></li>
                  <li><Link>Snacks</Link></li>
                  <li><Link>Cleaning</Link></li>
                </ul>
                <ul>
                  <li><Link>Meets</Link></li>
                  <li><Link>Greens</Link></li>
                  <li><Link>Snacks</Link></li>
                  <li><Link>Cleaning</Link></li>
                </ul>
            </Col>
            <Col lg="2" className="quickmenu footer-app half">
              <h3>Download Our App</h3>
              <img src="../Assets/Img/footer-appstore.png"></img>
              <img src="../Assets/Img/footer-googleplay.png"></img>
            </Col>
            <Col lg="2" className="quickmenu social">
              <h3>Address</h3>
              <p>208 Columbus St, Hicksville, OH, 4352</p>
              <h3>Social Media links</h3>
              <Link ><FontAwesome name="facebook" size="xl"/></Link>
              <Link ><FontAwesome name="twitter" size="xl"/></Link>
              <Link ><FontAwesome name="linkedin" size="xl"/></Link>
              <Link ><FontAwesome name="tumblr" size="xl"/></Link>
            </Col>
          </Row>
          <Row className="copyright-area">
            <Col lg="6">
              <p>Copyright © 2020 Dostava.com. All Rights Reserved.</p>
            </Col>
            <Col lg="6" className="text-right">
              <img src="../Assets/Img/payment.png"></img>
            </Col>
          </Row>
        </Container>

)
}

}

export default Footer;