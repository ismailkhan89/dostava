import React, {Component} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import logo from '../logo.png';
import FontAwesome from 'react-fontawesome'
import {
    Container,
    Row,
    Col
} from "reactstrap";
import {Link, useRouteMatch, useParams } from 'react-router-dom';

class Header extends React.Component{
    render(){

        
        const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
        const listItems = MenuItems.map((items, keys) =>
          <li key = {keys}>{items}</li>
        );
        const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
        const MenuList = MainMenu.map((items, keys) =>
          <li key = {keys} >{items}</li>
        );
        
        return(
            <Container className="header-area" fluid>
            <Row className="topBar">
              <Col lg="5">
                <p>
                  <span>FREE SHIPPING AND RETURNS </span>ON ALL ORDERS ABOVE $199</p>
  
              </Col>
              <Col lg="3" className="menuitems">
                <ul>{listItems}</ul>
              </Col>
              <Col lg="1" className="login">
                <Link to="/login">
                    <FontAwesome name="user"/>
                    <strong>Login</strong>
                </Link>
              </Col>
              <Col lg="1" className="wishlist">
                <FontAwesome name="heart-o" />
                Wishlist
                  <span className="favorites">0</span>
              </Col>
              <Col lg="1" className="language">
                EN
              </Col>
              <Col lg="1" className="myprofile">
                <FontAwesome name="user"/>
                <strong>My Profile</strong>
              </Col>
  
  
            </Row>
            <Row className="mainHeader">
              <Col lg="3" className="logo">
                <Link to="/">
                <img src={logo} alt="Logo" />
                </Link>
              </Col>
              <Col lg="6" className="menuitems">
                <ul>{MenuList}</ul>
              </Col>
              <Col lg="3">
  
              </Col>
            </Row>
          </Container>

)
}

}

export default Header;