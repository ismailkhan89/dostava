import React, { Component, useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import '../styleNew.css';
import '../animate.css';
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

  document.title  = props.title;
  // document.getElementsByTagName("META")[2].content= props.title;
  // document.getElementsByTagName("META")[3].content= props.title;
  // document.getElementsByTagName("META")[4].content= props.title;

  return (
  
    <Container className="header-area new-header" fluid>
        <title>{props.title}</title>
      <Row className="mainHeader ">
        <Navbar sticky="top" expand="lg" fluid="true">
          <Col lg="1" md="1" sm="1" xs="1" className="menu-button">
          {userObj ? null :
          <Nav className="align-items-center  d-md-flex" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <FontAwesome name="bars" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem >
                      <Link to="/register-vendor">
                        Add Your Store
                      </Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                      <Link to="/register-driver">
              Register as a Driver
            </Link>
                      
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              </Nav> 
}
            
            
          
          </Col>
          <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
          
          {userObj ?
          
          <Col lg="7" md="5" sm="5" xs="5" className="display-none"></Col> :
          <Col lg="4" md="2" sm="5" xs="5" className="display-none"></Col>
          }

          
          
         

          {/* {
            localStorage.getItem("user-dostava") ?
            <Col lg="2" md="2" sm="2" xs="2" className="text-right">
          </Col>  :
                null
            } */}


        {/* <Col lg="2" md="2" sm="2" xs="2" className="text-right"></Col> */}
        {userObj ? null :

        <Col lg="3" md="4" sm="1" className="quick-links" >
            <Link to="/register-vendor">
              Add Your Store
            </Link>
            <Link to="/register-driver">
              Register as a Driver
            </Link>
          </Col> 
}

          <Col lg="1" md="1" sm="1" xs="1" className="cart-icon-header" >
            <Link to="/cart">
              <FontAwesome name="shopping-bag" />
              <strong>{data ? data.cartItems : 0}</strong>
            </Link>
          </Col>

          { userObj ?
            <Col lg="1" md="2" sm="2" xs="2" className="login text-right">
        
            <Nav className="align-items-center  d-md-flex" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                      <h6 className="text-overflow m-0"><FontAwesome name="user-circle-o" />{userObj.name}</h6>
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

          <Col lg="1" md="2" sm="2" xs="2" className="login text-right min-481">
          {
            localStorage.getItem("user-dostava") ? null
              // <Link to="/login" onClick={e => {
              //   e.preventDefault()
              //   localStorage.removeItem("user-dostava")
              //   props.history.push("/login")
              // }}   >Logout <FontAwesome name="user" /></Link>
              :
              
                
                <Nav className="align-items-center  d-md-flex" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <FontAwesome name="user-circle-o" /> User
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem >
                        <Link to="/login"> Login/Signup </Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                      
                      <a href="https://vendor.dostava.com.au/">Login as Vendor</a>
                        {/* <i className="ni ni-user-run" />
                        <span>{'Logout'}</span> */}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              </Nav>
              }
          </Col>
          <Col lg="1" md="2" sm="2" xs="1" className="login text-right max-480">
          {
            localStorage.getItem("user-dostava") ? null
              // <Link to="/login" onClick={e => {
              //   e.preventDefault()
              //   localStorage.removeItem("user-dostava")
              //   props.history.push("/login")
              // }}   >Logout <FontAwesome name="user" /></Link>
              :
              
                <span>
                  <FontAwesome name="user-circle-o" />
                  <Link to="/login">Login</Link>
                  </span>

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