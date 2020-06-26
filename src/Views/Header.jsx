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
  constructor(props){
    super(props);
    this.activeRoute.bind(this);
    console.log("Header is here", props.history);
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
    render(){

        let userObj =  JSON.parse(localStorage.getItem("user-dostava")) ;
        console.log("userObj", userObj);
        const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
        const listItems = MenuItems.map((items, keys) =>
          <li key = {keys}>{items}</li>
        );
        const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
        const MenuList = MainMenu.map((items, keys) =>
          <li key = {keys} >{items}</li>
        );
        console.log("user-dostava>>",localStorage.getItem("user-dostava") );
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

              { userObj ? ' ' : <Col lg="2"></Col>
              }

              <Col lg="1" className="wishlist text-right">
                <FontAwesome name="heart-o" />
                Wishlist
                  <span className="favorites">0</span>
              </Col>
              
              { userObj ? 
                <Col lg="2" className="text-right">
                  {userObj.name}
                </Col>
                  : ' '}
               
              
              

              <Col lg="1" className="login text-right">
                {
                  localStorage.getItem("user-dostava") ? 
                  <Link  to="/login" onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("user-dostava")
                    this.props.history.push("/login")
                  }}   >Logout <FontAwesome name="user"/></Link> 
                   :
 
                  <Link to="/login" >Login <FontAwesome name="user"/> </Link>

                }
                
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
              <Col lg="3" className="cart-icon-header text-right">
                  <Link to="/cart">
                    <FontAwesome name="shopping-bag"/>
                    <strong>15</strong>
                  </Link>
              </Col>
            </Row>
          </Container>

)
}

}

export default Header;