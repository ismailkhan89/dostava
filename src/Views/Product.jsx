import React, { Component } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';

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
import { onAddToCart } from '../library/cart'
const FOODS = gql`${foods}`;
class Products extends React.Component {

  constructor(props) {
    console.log('props rec in products constructor', props.match.params.id);
    console.log('useParams', useParams)
    super(props);
    this.state = {
      message: '',
      _id: props.match.params?.id ?? null,
      filters: { onSale: false, inStock: false, min: 0, max: 1000 },
      search: ''
      //  img_menu = props.route.params?.img_menu ?? null,
      //  title = props.route.params?.title ?? null,
      //  description = props.route.params?.description ?? null
    }
  }

  onClickAddToCart = async (product) => {
    let responseMessage = await  onAddToCart(product);
    this.setState({ message: responseMessage })
    window.setTimeout(() => {
      this.setState({
        message: ""
      });
    }, 10000);
  }

  render() {


    console.log('inside HomePage');
    console.log('inside product');
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
        <Header  {...this.props} />
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
        <Container>
          <Row>
            <Col lg="12">
              <h4>{this.state.message}</h4>
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
                            <button onClick={e => {
                                                        e.preventDefault()
                                          // onAddToCart(product)
                                          this.onClickAddToCart(product)
                                                            
                                                    }} >Add to Cart</button>
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

        <Footer />


      </Container>


    )
  }

}

export default Products;