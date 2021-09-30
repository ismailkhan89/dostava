import React, { Component, useState, useEffect } from "react";
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
import { useQuery, useMutation } from '@apollo/react-hooks';
import { foods, like,foodbyVendor ,getCategoriesByLocation , getConfiguration} from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import { Form, FormControl } from 'react-bootstrap';
import { Redirect , useHistory , Link  } from "react-router-dom";
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})
const client = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache
});

const newclient = new ApolloClient({
  link:  httpLink,
  cache
});
// const FOODS = gql`${foods}`; 
const FOODS = gql`${foodbyVendor}`; 
const LIKE_PRODUCT = gql`${like}`;
const GETCARTITEMS = gql`${getCartItems}`;
const getVendorbyLocation = gql`${getCategoriesByLocation}`

function Categories(props) {

  const [_id, setId] = useState(props.match.params?.id ?? null);
  // const [lat,setlat] = useState(props.location.state?.location?.lat?.toString() ?? null);
  // const [lng,setlng] = useState(props.location.state?.location?.lng?.toString() ?? null);

  const [lat,setlat] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lat ?? null : null)
  const [lng,setlng] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lng ?? null : null)

  const [filters, setFilter] = useState({ onSale: false, inStock: false, min: 0, max: 1000 });
  const [search, setSearch] = useState('');

  // const { loading, error, data, refetch, networkStatus, client } = useQuery(FOODS, { variables:{category: _id , ...filters,
  //    search: search,lat : lat.toString(),long : long.toString()} ,client : newLink })

  const [mutateLike, { loadingLike: loadingLikeMutation }] = useMutation(LIKE_PRODUCT, { onCompletedLike, onErrorLike, client } )
  const { cartloading } = useQuery(GETCARTITEMS)
  const [message, setMessages] = useState('');

 
  // const history = useHistory();

  // const routeChange = (id) =>{ 
  //   let path = `/single-category/${id}`; 
  //   props.history.push({ path
  //   })
  // }


  // const history = useHistory();

  const routeChange = (id) =>{ 
    let path = `single-category`; 
    props.history.push(path,{ location:  props.location.state?.location , params : id  });
  }

  // console.log("food data", data);
   console.log("props",props)

  async function onLikeProduct(product) {
    mutateLike({
      variables: {
          "foodId": String(product._id)
      }
  })
  }
  async function onCompletedLike(data) {
    console.log("data onCompletedLike", data);
  }

  async function onErrorLike(data) {
    console.log("data onErrorLike", data);
  }
  async function likeProduct(product){
    mutateLike({
      variables: {
          "foodId": String(product._id)
      }
  })
  }
  async function onError(data) { 
    console.log("onError data", data)
  }
  async function onCompleted(data) { 
    console.log("complete data", data)
  }
  async function onAddToCart (product)  {

    console.log('onAddToCart>>> ', product);
    if (product.stock < 1) {
        // showMessage({
        //     message: 'Item out of stock',
        //     type: 'warning',
        //     floating: true,
        //     style: styles.alertbox,
        //     titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
        // })
        return 'Item out of stock';
    }

    if (product.variations.length === 1 && product.variations[0].addons.length === 0) {
      localStorage.setItem('lastStoreId',JSON.stringify(product.user._id));  
      const newItem = {
            // key: uuid.v4(),
            __typename: 'CartItem',
            _id: product._id,
            vendor: product.user._id,
            quantity: 1,
            variation: {
                __typename: 'ItemVariation',
                _id: product.variations[0]._id,
            },
            addons: []
        }
        const cartItemsStr = localStorage.getItem('cartItems') || '[]'
        const cartItems = JSON.parse(cartItemsStr)
        console.log("<<cartItems>>",cartItems)
        const index = cartItems.findIndex((product) => product._id === newItem._id)
        if (index < 0)
            cartItems.push(newItem)
        else {
            cartItems[index].quantity = cartItems[index].quantity + 1
        }
        console.log("<<new item entered>>",cartItems)
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        // props.navigation.navigate('Cart')
        return 'Item Added';
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }
  }

   async function onCLickProudctDetails(product) {
    props.history.push({
      pathname: '/detailsscreen',
      state: { product: product }
    })
   }  

  const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
  const listItems = MenuItems.map((items, keys) =>
    <li key={keys}>{items}</li>
  );
  const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
  const MenuList = MainMenu.map((items, keys) =>
    <li key={keys} >{items}</li>
  );
  // const { _id, filters, search } = this.state;
  function onCompleted(data){
    console.log(data)
  }
  function onError(data){
    console.log(data)
  }
  return (
    <Container className="wrapper" fluid>
    <Header  {...props} title="Categories by Dostava" />
      <Container className="breadcrumb-area" style={{display:'none'}} fluid>
        <Row>
          <Col lg="3">
          </Col>
          <Col lg="3" className="breadcrumb-section">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/" >Home</Link></li>

              <li><Link to="/product">Products</Link></li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container id="subheader" fluid>
        <Row>
          <Col lg="12">
          <h2 className="title text-center">CATEGORIES</h2>
					 <p className="content text-center">The purpose of lorem ipsum is to create a natural looking block of text that doesn't distract from the layout.</p>
          </Col>
        </Row>
      </Container>
      <Container id="search-product">
        <Row>
          
          <Col lg="12">
            <Form inline >
            <Query query={getVendorbyLocation} variables={{ lat : lat,long :lng}}>
                  {({ loading, error, data }) => {
                      if (loading) return <option>Loading...</option>
                      if (error) return <option>Error...</option>
                      return (
                        <select name="select-category">
                            <option>Select category</option>
                             {data.getCategoriesByLocation.map(category => <option key={category._id} value={category._id}>{category.title}</option>)}
                          </select>
                      )
            }}</Query>
              <FormControl type="search" placeholder="Enter delivery address here..." />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg="12">
            <h4>{message}</h4>
          </Col>
        </Row>
      </Container>
      <Container className="content-area" fluid>
        <Row>
          <Container id="Product-carousel">
            

            <Row>
                <Col lg="12" >
                  <h2 className="title">All Categories</h2>
                </Col>
            </Row>

            <Row>
            <Query query={getVendorbyLocation} variables={{ lat : lat,long :lng}}>
            {({ loading, error, data }) => {
             if (loading) return <div>{"Loading"}...</div>;
             if (error) return <div>`${"Error"}! ${error.message}`</div>;
              return data.getCategoriesByLocation.length > 0 ? data.getCategoriesByLocation.map((category, index) =>
                <Col lg="3" key={index}>
                <Link
                    to={`/single-category/${category._id}`}
                    params="true"
                    onClick={e => {
                    e.preventDefault()
                    props.history.push({
                      pathname: `/single-category/${category._id}`,
                      state : {
                        title : category.title,
                        description : category.description,
                        category : data.getCategoriesByLocation
                      }
                      // state: {...props.history?.state,location:  props.location.state?.location , params : category._id}
                    })
                    // props.history.push("/single-category",{ location:  props.location.state?.location , params : category._id  });
                    }}
                  > 
                  <div className="product"
                  //  onClick={() => routeChange(category._id)}
                   >


                  {/* <Link to="/login" onClick={e => {
                e.preventDefault()
                localStorage.removeItem("user-dostava")
                props.history.push("/login")
              }} > */}
          
                    <div className="product-img">
                      <img className="img-fluid" src={category.img_menu} alt=""></img>
                    </div>
                    <div className="product-desc">
                      <h3 className="product-title">{category.title}</h3>
                      <p className="product-content">{category.description}</p>
                      {/* <p class="price">$24.03</p> */}
                    </div>
                    </div>
                   </Link>

                  </Col>
                )

                :   <React.Fragment>
                <Col lg="4" className="text-center">
                </Col>
                <Col lg="4" className="text-center">
                 Please Change your Location there is no food available at your place ... 
                </Col>
                <Col lg="4" className="text-center">
                </Col>
                </React.Fragment>
                
                
              }}
            </Query>
            </Row>

            <Row>
              <Col lg="12">
                <Link to="#" className="learn-more">Load More</Link>
              </Col>
            </Row>
            
          </Container>
          
        </Row>
      </Container>

      <Container className="app-area" fluid>
              <Row>
                <Col lg="6" className="app-area-img">
                  <img src='../Assets/Img/Mobile-Mockups.png' ></img>
                </Col>
                <Col lg="6" className="app-area-text">
                  <h3>Dostava is Available for your Android or Apple</h3>
                  <img src='../Assets/Img/playstore.png' ></img>
                  <img src='../Assets/Img/appstore.png' ></img>
                </Col>
              </Row>
        </Container>

      <Footer />


    </Container>


  )
}

export default Categories;