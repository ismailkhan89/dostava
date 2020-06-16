import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import logo from '../logo.png';
// import logo from './logo.svg';
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Table,
    Media,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    FormGroup,
    Input
} from "reactstrap";

class HomePage extends React.Component{

  
  render(){
    console.log('inside HomePage')
    const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
    const listItems = MenuItems.map((items) =>
      <li>{items}</li>
    );
    const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
    const MenuList = MainMenu.map((items) =>
      <li>{items}</li>
    );
    return(
      
        <Container className="header-area" fluid>
          <Row className="topBar">
            <Col lg="6">
              <p>
                <span>FREE SHIPPING AND RETURNS </span>ON ALL ORDERS ABOVE $199</p>
            </Col>
            <Col lg="3" className="menuitems">
              <ul>{listItems}</ul>
            </Col>
            <Col lg="3" className="menuitems rightmenu">
              <ul>
                <li><strong>Login</strong></li>
                <li>Wishlist</li>
                <li>EN</li>
                <li><strong>My Profile</strong></li>
              </ul>
            </Col>
          </Row>
          <Row className="mainHeader">
            <Col lg="3" className="logo">
              <img src={logo} alt="Logo" />;
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

  export default HomePage;