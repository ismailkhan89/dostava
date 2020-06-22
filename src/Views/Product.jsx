import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import logo from '../logo.png';
import FontAwesome from 'react-fontawesome'
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Link, useParams } from 'react-router-dom';
import { foods } from "../apollo/server";
const FOODS = gql`${foods}`;
class Products extends React.Component {

  constructor(props) {
    console.log('props rec in products constructor', props.match.params.id);
    console.log('useParams', useParams)
    super(props);
    this.state = {
      _id: props.match.params?.id ?? null,
      filters: { onSale: false, inStock: false, min: 0, max: 1000 },
      search: ''
      //  img_menu = props.route.params?.img_menu ?? null,
      //  title = props.route.params?.title ?? null,
      //  description = props.route.params?.description ?? null
    }
  }


  render() {


    console.log('inside HomePage')
    const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
    const listItems = MenuItems.map((items, keys) =>
      <li key={keys}>{items}</li>
    );
    const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
    const MenuList = MainMenu.map((items, keys) =>
      <li key={keys} >{items}</li>
    );
    const { _id, filters, search } = this.state;
    return (
      <Container className="wrapper" fluid>
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
              <FontAwesome name="user" size="xl" />
              <strong>Login</strong>
            </Col>
            <Col lg="1" className="wishlist">
              <FontAwesome name="heart-o" size="xl" />
              Wishlist
                <span className="favorites">0</span>
            </Col>
            <Col lg="1" className="language">
              EN
            </Col>
            <Col lg="1" className="myprofile">
              <FontAwesome name="user" size="xl" />
              <strong>My Profile</strong>
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
        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="3" className="breadcrumb-section">
              <h3>Products</h3>
              <ul>
                <li><Link>Home</Link></li>

                <li><Link>Products</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Container className="content-area" fluid>
          <Row>
            <Col lg="3" className="sidebar-products">
              <div className="single-filter">
                <h3>Filter by Category</h3>
                <ul>
                  <li><Link>Laptop & Computer <span>(439)</span></Link></li>
                  <li>
                    <Link>Meats <span>(2224)</span></Link>
                    <ul>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                    </ul>
                  </li>
                  <li><Link>Greens <span>(439)</span></Link></li>
                  <li><Link>Snacks <span>(439)</span></Link></li>
                  <li><Link>Cleaning <span>(439)</span></Link></li>
                  <li><Link>Bakery <span>(439)</span></Link></li>
                </ul>
              </div>

              <div className="single-filter">
                <h3>Filter by Category</h3>
                <ul>
                  <li><Link>Laptop & Computer <span>(439)</span></Link></li>
                  <li>
                    <Link>Meats <span>(2224)</span></Link>
                    <ul>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                    </ul>
                  </li>
                  <li><Link>Greens <span>(439)</span></Link></li>
                  <li><Link>Snacks <span>(439)</span></Link></li>
                  <li><Link>Cleaning <span>(439)</span></Link></li>
                  <li><Link>Bakery <span>(439)</span></Link></li>
                </ul>
              </div>
            </Col>
            <Col lg="9">
              <Row>
                <Query query={FOODS}
                  variables={{ category: _id, ...filters, search: search }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <tr><td>{"Loading"}...</td></tr>;
                    if (error) return <tr><td>`${"Error"}! ${error.message}`</td></tr>;
                    return data.foodByCategory.map((product, index) =>
                      <Col lg="3" key={index}>
                        <div className="single-slider-product">
                          <img src={product.img_url}></img>
                          <div className="leftIcons">
                            <span>New</span>
                            <span className="Salebg">Sale</span>
                          </div>
                          <div className="RightIcons">
                            <FontAwesome name="heart-o" />
                            <FontAwesome name="share" />
                          </div>
                        </div>
                        <div className="single-slider-product-detail">
                          <div className="leftDetails">
                            <h3> {product.title}</h3>
                            <button>Add to Cart</button>
                          </div>
                          <div className="rightDetails">
                            {/* <span> $ {product.variations[0].price}</span> */}
                            <strong>{product.variations[0].price}</strong>
                            <a href="#">Buy Now</a>
                          </div>
                        </div>
                      </Col>
                    )
                  }}
                </Query>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container className="footer-area" fluid>
          <Row className="widget-area">
            <Col lg="3" className="footer-logo">
              <div>
                <img src="../Assets/Img/logo.png"></img>
              </div>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">About Us</a></li>
              </ul>
            </Col>
            <Col lg="2" className="quickmenu">
              <h3>Help/Support</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">How it works</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </Col>
            <Col lg="3" className="quickmenu half">
              <h3>Category</h3>
              <ul>
                <li><a href="#">Meets</a></li>
                <li><a href="#">Greens</a></li>
                <li><a href="#">Snacks</a></li>
                <li><a href="#">Cleaning</a></li>
              </ul>
              <ul>
                <li><a href="#">Meets</a></li>
                <li><a href="#">Greens</a></li>
                <li><a href="#">Snacks</a></li>
                <li><a href="#">Cleaning</a></li>
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
              <Link ><FontAwesome name="facebook" size="xl" /></Link>
              <Link ><FontAwesome name="twitter" size="xl" /></Link>
              <Link ><FontAwesome name="linkedin" size="xl" /></Link>
              <Link ><FontAwesome name="tumblr" size="xl" /></Link>
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


      </Container>


    )
  }

}

export default Products;