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
    Table,
    // Link
} from "reactstrap";
import {Link, useRouteMatch, useParams } from 'react-router-dom';

class Cart extends React.Component{

  
  render(){
    
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...this.props} />
        
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

        <Container className="content-area cart-page" fluid>
          <Row>
            <Col lg="2">

            </Col>
            <Col lg="8" className="cart-section">
                <h3>My Cart</h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox"></input></td>
                            <td><img src="../Assets/Img/cart-product.png"></img></td>
                            <td>Sample Product <br/>Image</td>
                            <td><strong>$200.00</strong></td>
                            <td>
                                <select>
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                </select>
                                    </td>
                            <td><strong>$200.00</strong></td>
                            <td><FontAwesome name="trash" /></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></input></td>
                            <td><img src="../Assets/Img/cart-product.png"></img></td>
                            <td>Sample Product <br/>Image</td>
                            <td><strong>$200.00</strong></td>
                            <td>
                                <select>
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                </select>
                                    </td>
                            <td><strong>$200.00</strong></td>
                            <td><FontAwesome name="trash" /></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><strong>Total $600.00</strong></td>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </Table>
                <Row>
                    <Col lg="8" className="voucher">
                        <h2>VOUCHER</h2>
                        <p>Enter your coupon code if you have one.</p>
                        <input type="text" placeholder="Voucher Code"></input>
                        <input type="submit" value="Apply" />
                    </Col>
                    <Col lg="4" className="subtotal">
                        <div>
                            <h4>Subtotal <span>$600.00</span></h4>
                            <h4>Shipping <span>$20.00</span></h4>
                            <h4 className="blue">Total <span>$620.00</span></h4>
                            <input type="submit" value="Checkout" />
                        </div>
                    </Col>
                </Row>
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

  export default Cart;