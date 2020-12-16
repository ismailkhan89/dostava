import React, { Component, useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import logo from '../logo.png';
import FontAwesome from 'react-fontawesome';
import { useQuery } from '@apollo/react-hooks';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import gql from "graphql-tag";
import {
  Container,
  Row,
  Col,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media
} from "reactstrap";
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { getCartItems } from '../apollo/client';
const GETCARTITEMS = gql`${getCartItems}`;

function Header(props) {
  const { client, data, loading } = useQuery(GETCARTITEMS)
  const [toggle, setToggle] = useState(false)
  const [cartItemCount, setCartItemCount] = useState('0')
  useEffect(() => {
    getData()
  }, [getData])
  useEffect(() => {
    activeRoute()
  }, [])

  async function getData() {
    const cartItems = await localStorage.getItem('cartItems')
    console.log("items in header ", JSON.parse(cartItems))
    client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems ? JSON.parse(cartItems).length : 0 } })
  }
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  console.log('have data form getCartItems', data)
  // Toggle = () => {
  //   // this.setState({toggle:!this.state.toggle})
  //   setToggle(!toggle)
  // }

  let userObj = JSON.parse(localStorage.getItem("user-dostava"));
  const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
  const listItems = MenuItems.map((items, keys) =>
    <li key={keys}>{items}</li>
  );
  const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
  const MenuList = MainMenu.map((items, keys) =>
    <li key={keys} >{items}</li>
  );
  console.log("user-dostava>>", localStorage.getItem("user-dostava"));
  return (
    <Container className="header-area">
        <title>{props.title}</title>
      <Row className="mainHeader ">
        <Navbar sticky="top" expand="lg" fluid="true">

          <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
          
          {userObj ?
          
          <Col lg="3"></Col> :
          <Col lg="5"></Col>
}

          <Col lg="3" className="driver">
            <Link to="https://www.dostava.com.au/register-driver">Driver</Link>
            <Link to="https://www.dostava.com.au/register-vendor">Vendor</Link>
          </Col>
          
         

          {
            localStorage.getItem("user-dostava") ?
            <Col lg="2" md="2" sm="2" xs="2" className="text-right">
          </Col>  :
                null
            }


        {/* <Col lg="2" md="2" sm="2" xs="2" className="text-right"></Col> */}


         

          <div className="cart-icon-header" lg="1">
            <Link to="/cart">
              <FontAwesome name="shopping-bag" />
              <strong>{data ? data.cartItems : 0}</strong>
            </Link>
          </div>

          { userObj ?
            <Col lg="1" md="6" sm="6" xs="6" className="login text-right">
        
            <Nav className="align-items-center d-none d-md-flex" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                      <h6 className="text-overflow m-0">{userObj.name}</h6>
                          {/* <span className="mb-0 text-sm">
                          {userObj.name}
                          </span> */}
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">{'Welcome'}!</h6>
                      </DropdownItem> 
                      <DropdownItem divider />
                      <DropdownItem >
                      <Link to="/myorders" onClick={e => {
                          e.preventDefault()
                          props.history.push("/myorders")
                          }}   ><FontAwesome name="list-alt" /> My Orders </Link>
                        {/* <i className="ni ni-user-run" />
                        <span>{'Logout'}</span> */}
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                      <Link to="/login" onClick={e => {
                          e.preventDefault()
                          localStorage.removeItem("user-dostava")
                          props.history.push("/login")
                          }}   ><FontAwesome name="user" /> Logout </Link>
                        {/* <i className="ni ni-user-run" />
                        <span>{'Logout'}</span> */}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              </Nav>
         
          </Col>
          : ' '}
          {/* {
            localStorage.getItem("user-dostava") ?
          <Col lg="1" md="6" sm="6" xs="6" className="login text-right">
              <Link to="/myorders" onClick={e => {
                e.preventDefault()
                props.history.push("/myorders")
              }}   > <FontAwesome name="list-alt" /></Link>
          </Col>  :
              null
          } */}

          <Col lg="1" md="6" sm="6" xs="6" className="login text-right">
          {
            localStorage.getItem("user-dostava") ? null
              // <Link to="/login" onClick={e => {
              //   e.preventDefault()
              //   localStorage.removeItem("user-dostava")
              //   props.history.push("/login")
              // }}   >Logout <FontAwesome name="user" /></Link>
              :
              <Link to="/login" ><FontAwesome name="user-circle-o" /> Login</Link>
              }
          </Col>
        

          {/* <Col lg="1" className="language">
            EN
          </Col> */}

        </Navbar>
        
      </Row>
    </Container>
  )
}

export default Header;