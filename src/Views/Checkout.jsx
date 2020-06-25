import React, {Component} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import FontAwesome from 'react-fontawesome'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
    Table,
   
    // Link
} from "reactstrap";
import {Link, useRouteMatch, useParams } from 'react-router-dom';

class Checkout extends React.Component{

  
  render(){

    
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...this.props} />
        
        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="4" className="breadcrumb-section">
              <h3>My Checkout</h3>
              <ul>
                <li><Link>Home</Link></li>

                <li><Link>My Checkout</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Container className="content-area cart-page" fluid>
          <Row>
            <Col lg="2">

            </Col>
            <Col lg="8" className="cart-section">
            <Tabs>
              <TabList>
                <Tab>Shipping and Checkout</Tab>
                <Tab disabled>Confirmation</Tab>
              </TabList>
          
              <TabPanel>
                <Row>
                  <Col lg="12">
                    <Row>
                      <Col lg="7">
                        <h3>Billing Details</h3>
                      </Col>
                      <Col lg="5">
                        <h3>Billing Details</h3>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col lg="7">

                  </Col>
                  <Col lg="5">

                  </Col>
                </Row>
                <h2>Any content 1</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs>
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

  export default Checkout;