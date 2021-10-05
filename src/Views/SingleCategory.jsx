import React, { Component, useState, useEffect, useContext } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';

import FontAwesome from 'react-fontawesome'
import {
  Container,
  Row,
  Col,
  Button,
  Alert
} from "reactstrap";
import gql from "graphql-tag";
import ConfigurationContext from "../context/Configuration.js";
import FlashAlert from "../Components/FlashAlert.jsx";
import { Query, Mutation } from "react-apollo";
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { foods, like,foodbyVendor ,getCategoriesByLocation , getConfiguration} from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import { Form, FormControl } from 'react-bootstrap';
import { getItemPrice } from '../utils/pricing'
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
const GET_CONFIGURATION = gql`${getConfiguration}`;

function Categories(props) {

  // var lat = "24.893120";
  // var long = "67.063950"
  // var id = "5f0ea61a44f4211d54bfe6ba";
   console.log(props)

   const [configuration ,setConfiguration] = useState('');

  const {loading :loadingConfig,error : errorConfig,data : dataConfig} = useQuery(GET_CONFIGURATION, { client : newclient,fetchPolicy: 'network-only'  })

   React.useEffect(() => {
    const onCompleted = (dataConfig) => {
      setConfiguration(dataConfig)
    }
      if(!loadingConfig && !errorConfig){
        onCompleted(dataConfig)
      }
   },[dataConfig])


  // const [_id, setId] = useState(props.location?.state?.params ?? null);
  const [_id, setId] = useState(props.match.params?.id ?? null);

  const [filters, setFilter] = useState({ onSale: false, inStock: false, min: 0, max: 1000 });
  const [search, setSearch] = useState('');
  const [SearchText,setSearchText] = useState('');

  const [lat,setLat] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lat ?? null : null)
  const [lng,setLng] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lng ?? null : null)
  // const [lat, setLat] = useState(props.location?.state?.location?.lat.toString() ?? null);
  // const [lng, setLng] = useState(props.location?.state?.location?.lng.toString() ?? null);

  const {loading,error,data : dataVendorLocation} = useQuery(getVendorbyLocation, { variables:{ lat : lat,long :lng} ,client : newclient })
  console.log("dataVendor", dataVendorLocation)

  const [title ,setTitle] = useState(props.location?.state?.title ?? 'Single Categories')
  const [description ,setDescription] = useState(props.location?.state?.description ?? null)
  // const { loading, error, data, refetch, networkStatus, client } = useQuery(FOODS, { variables:{category: _id , ...filters,
  //    search: search,lat : lat.toString(),long : lng.toString()} ,client : newLink })

  const [mutateLike, { loadingLike: loadingLikeMutation }] = useMutation(LIKE_PRODUCT, { onCompletedLike, onErrorLike, client } )
  const { cartloading } = useQuery(GETCARTITEMS)
  const [message, setMessages] = useState('');
  const [VendorIds,setVendorIds] = useState([]);

  const [messagealert , setMessage ] = useState('')
  const [messagecolor , setMessagecolor ] = useState('')
  console.log("props.match.params?.id", props.match.params?.id);

   console.log("propspropsprops", props);
  // console.log("foodloading",loading)

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

  async function setVendorIdsArray(product){
    const cartItemsStr = await localStorage.getItem('cartItems')
    const cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : []
    let vendorIds = [];
    console.log("productproductproduct",product)

    // cartItems.map(food => {  
    //   if(vendorIds.length > 0){
    //     var cont = vendorIds.find(a => {
    //       if(a !== food.vendor) vendorIds.push(food.vendor)
    //     })
    //   }
    //   else{
    //     vendorIds.push(food.vendor)
    //   }
    // })
    //  console.log("Vids??>>",vendorIds)
    // setVendorIds(vendorIds);
  } 
  const config = useContext(ConfigurationContext)
  async function isVendorLimitExceeds (product) {
    let ids = await localStorage.getItem("vendorIds");
    let vendorIds = ids === null ? [] : JSON.parse(ids);
    console.log("isVendorLimitExceeds vendorIds", vendorIds.length)
    if(vendorIds.length < config.max_vendor){
        console.log("vendorIds.length < configuration.max_vendor", vendorIds.length)
        if(product && !vendorIds.includes(product.user._id)){
            vendorIds.push(product.user._id)
            localStorage.setItem("vendorIds",JSON.stringify(vendorIds));
        }
        return vendorIds;
    }        
  }
  async function onAddToCart (product)  {

    let vIds = await localStorage.getItem("vendorIds");
    const cartItemsStr = await localStorage.getItem('cartItems') || '[]'
    const cartItems = JSON.parse(cartItemsStr)
     const selectedItem = cartItems.filter((itm) => itm._id === product._id)
     if(selectedItem[0].quantity === product.stock || selectedItem[0].quantity > product.stock){
      // setEditModal(false)
      setMessagecolor('warning');
      setMessage('We have only '+product.stock+ ' '+ product.title +' in stock')
      return null
     }
    if (parseInt(product.stock) === 0) {
        // showMessage({
        //     message: 'Item out of stock',
        //     type: 'warning',
        //     floating: true,
        //     style: styles.alertbox,
        //     titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
        // })
        // alert('Item out of stock')
        setMessagecolor('warning');
        setMessage('Item out of stock!')
        // return 'Item out of stock';
        return
    }
    let vendors = vIds === null ? [] : JSON.parse(vIds);
    isVendorLimitExceeds(product)

    if(vendors.length === config.max_vendor && !vendors.includes(product.user._id)){
      if(window.confirm('Your cart already contains items from another shop. would you like to clear the cart and add items from this shop instead?')){
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: 0 } })
        await localStorage.removeItem('cartItems')
        await localStorage.removeItem('vendorIds')
        onAddToCart(product)
      }
      return
    }

    if (parseInt(product.stock) > 0 && product.variations.length === 1 && product.variations[0].addons.length === 0) {
      setVendorIdsArray(product)
      localStorage.setItem('lastStoreId',JSON.stringify(product.user._id));
        const newItem = {
            // key: uuid.v4(),
            __typename: 'CartItem',
            _id: product._id,
            vendor: product.user._id,
            quantity: 1,
            vendor_quantity : 1,
            vendor_price : product.vendor_pricing,
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
            cartItems[index].vendor_quantity = cartItems[index].vendor_quantity + 1
        }
        console.log("<<new item entered>>",cartItems)
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        setMessagecolor('success');
        setMessage('Added!')
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }

    
  }
  return (
    <Container className="wrapper" fluid>
      <Header  {...props} title={title +" by Dostava"} />
      <FlashAlert message={messagealert} color={messagecolor} />
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
          <h2 className="title text-center">{title}</h2>
  <p className="content text-center">{description}</p>
          </Col>
        </Row>
      </Container>
      <Container id="search-product">
        <Row>
          
          <Col lg="12">
            <Form inline>

            <select name="select-category">
                <option>Select category</option>
              {props.location.state?.category ? 
               props.location.state?.category.map(category => <option key={category._id} value={category._id}>{category.title}</option>)
              : null }
                {/* {props.location.state?.category.map(category => <option key={category._id} value={category._id}>{category.title}</option>)} ?? null}  */}
                  {/* {data.getCategoriesByLocation.map(category => <option key={category._id} value={category._id}>{category.title}</option>)} */}
            </select>

            
              <FormControl type="search" placeholder="Search Product ..." value={SearchText} onChange={(e) => setSearchText(e.target.value)} />
            <Button variant="outline-success" onClick={(e) => {
              e.preventDefault();
              setSearch(SearchText)} }>Search</Button>
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
            
          {_id && lat && lng && search === '' &&
          <>
            <Row>
                <Col lg="12" >
                  <h2 className="title">New Products</h2>
                </Col>
            </Row>
           
            <Row>
              {/* <Query query={getVendorbyLocation} variables={{ lat : lat.toString(),long :lng.toString()}}>
              {({ loading, error, data }) => {
              if (loading) return <div>{"Loading"}...</div>;
              if (error) return <div>`${"Error"}! ${error.message}`</div>;
                return data.getCategoriesByLocation.map((category, index) =>
                  <Col lg="3" key={index}>
                    <div class="product">
                      <Link to="/">
                      <div class="product-img">
                        <img class="img-fluid" src={category.img_menu} alt=""></img>
                      </div>
                      <div class="product-desc">
                        <h3 class="product-title">{category.title}</h3>
                        <p class="product-content">{category.description}</p>
                      </div>
                      </Link>
                      </div>
                    </Col>
                  )
                }}
              </Query> */}

          <Query query={FOODS} variables={{ category: _id ,lat : lat,long : lng}}>
            {({ loading, error, data }) => {
             if (loading) return <div>{"Loading"}...</div>;
             if (error) return <div>`${"Error"}! ${error.message}`</div>;
            return data.foodByVendorCategory.map((category, index) =>{
                if(index  <= 3){
               return  <Col lg="3" key={index}>
                  <div className="product">
                    <Link to="/">
                    <div className="product-img">
                      <img className="img-fluid" src={category.img_url} alt=""></img>
                    </div>
                    <div className="product-desc">
                      <h3 className="product-title">{category.title}</h3>
                      <p className="product-content">{category.description}</p>
                    </div>
                    </Link>
                    </div>
               </Col>
                }
                }
                  
                )
              }}
            </Query>
            </Row>
            </>
}
            
            
          </Container>
          
        </Row>
        <Row>
          <Container id="dry-fruits" className="all-products">
          <Row>
                <Col lg="12" >
                  <h2 className="title">All Products</h2>
                </Col>
            </Row>

              {_id && lat && lng && 
                <Row>
                <Query query={FOODS} variables={{ category: _id , ...filters,
                  search: search,lat : lat,long : lng}}>
                {({ loading, error, data }) => {
                if (loading) return <div>{"Loading"}...</div>;
                if (error) return <div>`${"Error"}! ${error.message}`</div>;

                console.log( "datadata",data)
                  return data.foodByVendorCategory.map((category, index) =>
                    <Col lg="6" key={index}>
                      <div className="product-list">
                        {/* <Link to="/"> */}
                          <h3>{category.title}</h3>
                          <p>{category.description}</p>
                          <p className="price">  ${getItemPrice(category,configuration)}</p>
                          {/* <Button className="add-to-cart" onClick={() => onAddToCart(category)} ></Button> */}
                          {/* <Link className="add-to-cart">Add to Cart</Link> */}
                         <a className="add-to-cart" href="#" onClick={(e) => onAddToCart(category)}>Add to cart</a>
                       
                          {/* <p class="price">$24.03</p> */}
                        
                        {/* </Link> */}
                        </div>
                      </Col>
                    )
                  }}
                </Query>
                </Row>
            }


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