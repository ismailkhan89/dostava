import React, {Component} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import FontAwesome from 'react-fontawesome'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import logo from '../logo.png';

import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardHeader,
    Container,
    Row,
    Col,
    Button,
    // Link
} from "reactstrap";
import {Link, useRouteMatch, useParams } from 'react-router-dom';

class Login extends React.Component{

  
  render(){

    console.log('asd');
    console.log('inside HomePage')
    const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
    const listItems = MenuItems.map((items, keys) =>
      <li key = {keys}>{items}</li>
    );
    const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
    const MenuList = MainMenu.map((items, keys) =>
      <li key = {keys} >{items}</li>
    );
    
    return(
      
        <Container className="wrapper" fluid>
        
        <Header />
        
        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="3" className="breadcrumb-section">
              <h3>Login</h3>
              <ul>
                <li><Link>Home</Link></li>

                <li><Link>Login</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Container className="content-area" fluid>
          <Row>
            <Col lg="2">

            </Col>
            <Col lg="4">
            <div className="form-area">
              <h2>Login your Account</h2>
              <h3>Login to your account to discovery all great features in this item</h3>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Username"></input>
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Username"></input>
                </div>
                <div className="form-group">
                  <label>
                  <input type="checkbox"></input>
                  Keep me logged in
                  </label>
                  <Link to="/">Forget your password?</Link>
                </div>
                <div className="form-group">
                <input type="submit" value="Login" />
                </div>
                <div className="form-group or-login-with">
                  <p>
                    OR login with 
                    <Link to="/about"><FontAwesome name="facebook"/></Link>
                    <Link to="/about"><FontAwesome name="twitter"/></Link>
                    <Link to="/about"><FontAwesome name="google-plus"/></Link>
                    <Link to="/about"><FontAwesome name="instagram"/></Link>
                  </p>
                </div>
              </form>
              </div>
            </Col>
            <Col lg="4">
              <div className="form-area register">
              <h2>Register Account Now</h2>
              <h3>Register to your account to discovery all great features in this item</h3>
              <form>
                <div className="form-group half">
                  <input type="text" placeholder="Username"></input>
                </div>
                <div className="form-group half">
                  <input type="text" placeholder="Username"></input>
                </div>
                <div className="form-group half">
                  <input type="text" placeholder="Username"></input>
                </div>
                <div className="form-group half">
                  <input type="text" placeholder="Username"></input>
                </div>
                <div className="form-group half">
                  <input type="text" placeholder="Username"></input>
                </div>
                <div className="form-group half">
                  <input type="password" placeholder="Username"></input>
                </div>
                <div className="form-group">
                  <label>
                  <input type="checkbox"></input>
                  I accept the terms and conditions, including the Privacy Policy
                  </label>
                </div>
                <div className="form-group">
                <input type="submit" value="Register" />
                </div>
                <div className="form-group or-login-with">
                  <p>
                    OR Register with 
                    <Link to="/about"><FontAwesome name="facebook"/></Link>
                    <Link to="/about"><FontAwesome name="twitter"/></Link>
                    <Link to="/about"><FontAwesome name="google-plus"/></Link>
                    <Link to="/about"><FontAwesome name="instagram"/></Link>
                  </p>
                </div>
              </form>
              </div>
            </Col>
            <Col lg="2">
              
            </Col>
          </Row>
          </Container>
        
        
        <Footer />

      
      </Container>
     
      
    )
  }

}

  export default Login;