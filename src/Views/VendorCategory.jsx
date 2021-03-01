import React, { Component, useState, useEffect } from "react";
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
import { Query, Mutation } from "react-apollo";
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation  } from '@apollo/react-hooks';
import { foods, like,foodbyVendorId ,getCategoriesByLocation , getConfiguration} from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import { Form, FormControl } from 'react-bootstrap';
import { getItemPrice } from '../utils/pricing'
import FlashAlert from "../Components/FlashAlert.jsx";
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
const FOODS = gql`${foodbyVendorId}`; 
const LIKE_PRODUCT = gql`${like}`;
const GETCARTITEMS = gql`${getCartItems}`;
const getVendorbyLocation = gql`${getCategoriesByLocation}`
const GET_CONFIGURATION = gql`${getConfiguration}`;

function VendorCategory(props) {


    React.useEffect(() => {
      window.scrollTo(0, 0)
    },[]);

  // var lat = "24.893120";
  // var long = "67.063950"
  // var id = "5f0ea61a44f4211d54bfe6ba";
   console.log(props)

   const [configuration ,setConfiguration] = useState('');

  const {loading :loadingConfig,error : errorConfig,data : dataConfig} = useQuery(GET_CONFIGURATION, { client : newclient
    ,fetchPolicy: 'network-only'   })

    
   React.useEffect(() => {
    const onCompleted = (dataConfig) => {
      setConfiguration(dataConfig)
    }
      if(!loadingConfig && !errorConfig){
        onCompleted(dataConfig)
      }
   },[dataConfig])

   

  // const [_id, setId] = useState(props.location?.state?.params ?? null);
//   const [_id, setId] = useState(props.location?.state?.categoryid ?? null);
  const [_id, setId] = useState(props.match.params?.id ?? null);

  const [filters, setFilter] = useState({ onSale: false, inStock: false, min: 0, max: 1000 });
  const [search, setSearch] = useState('');
  const [SearchText,setSearchText] = useState('');

  const [lat,setLat] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lat ?? null : null)
  const [lng,setLng] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lng ?? null : null)
  // const [lat, setLat] = useState(props.location?.state?.location?.lat.toString() ?? null);
  // const [lng, setLng] = useState(props.location?.state?.location?.lng.toString() ?? null);

  const {loading,error,data : dataVendorLocation} = useQuery(getVendorbyLocation, { variables:{ lat : lat,long :lng} ,client : newclient })

  const [title ,setTitle] = useState(
   JSON.parse(localStorage.getItem('storeItem'))?.title ?? 'Single Categories'
    )
  const [description ,setDescription] = useState(
    JSON.parse(localStorage.getItem('storeItem'))?.description ?? null)

    const [physical_address ,setPhysicalAddress] = useState(
      JSON.parse(localStorage.getItem('storeItem'))?.location ?? null)

    
  const [messagealert , setMessage ] = useState('')
  const [messagecolor , setMessagecolor ] = useState('')
  
  // const { loading, error, data, refetch, networkStatus, client } = useQuery(FOODS, { variables:{category: _id , ...filters,
  //    search: search,lat : lat.toString(),long : lng.toString()} ,client : newLink })

  const [mutateLike, { loadingLike: loadingLikeMutation }] = useMutation(LIKE_PRODUCT, { onCompletedLike, onErrorLike, client } )
  const { cartloading } = useQuery(GETCARTITEMS)
  const [message, setMessages] = useState('');
  const [VendorIds,setVendorIds] = useState([]);
  
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
      setVendorIdsArray(product)
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
        // props.navigation.navigate('Cart')
        return 'Item Added';
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }
  }

  return (
    <Container className="wrapper" fluid>
      <Header  {...props} title={title +" at Dostava"} />
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
        <p className="content text-center">{physical_address}</p>
          </Col>
        </Row>
      </Container>
      <Container id="search-product">
        <Row>
        <Col sm={10}>
            {/* <select name="select-category">
                <option>Select Vendor</option>
              {props.location.state?.category ? 
               props.location.state?.category.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
              : null }
            </select> */}

             
              <FormControl type="search" placeholder="Search Product ..." 
              value={SearchText} onChange={(e) => setSearchText(e.target.value)} className="mr-sm-2 col-lg-12" />
          </Col>
          <Col sm={2}>
          
          <Link to={`/search-product?q=${SearchText}`}> 
            <Button variant="outline-success">
                Search</Button>  
          </Link>
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

          <Query query={FOODS} variables={{ vendor_id: _id ,lat : lat,long : lng}}>
            {({ loading, error, data }) => {
             if (loading) return <div>{"Loading"}...</div>;
             if (error) return <div>`${"Error"}! ${error.message}`</div>;
             
            return data.foodsByVendor.length > 0 ? data.foodsByVendor.map((category, index) =>{
             
                if(index  <= 3){
               return  <Col lg="3" key={index}>
                  <div className="product">
                    {/* <Link to="/"> */}
                    <div className="product-img">
                    
                    {/* <img className="img-fluid" src={category.img_url} alt=""></img> */}

                    {category.img_url !== "" && category.img_url !== null ? 
                      <img className="img-fluid" src={category.img_url} alt=""></img>
                    :  <img className="img-fluid" src="../Assets/Img/placeholder-img.png" alt=""></img>
                    }
                    </div>
                    <div className="product-desc">

                      <h3 className="product-title">{category.title}</h3>
                      <p className="product-content">{category.description}</p>
                    </div>
                    {/* </Link> */}
                    </div>
               </Col>
                }
                }
                  
                ) : <Col lg="3">No New Product Available</Col>
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
                  {!loadingConfig && !errorConfig && 
                <Query query={FOODS} variables={{ vendor_id: _id , ...filters,
                  search: search,lat : lat,long : lng}}>
                {({ loading, error, data }) => {
                if (loading) return <div>{"Loading"}...</div>;
                if (error) return <div>`${"Error"}! ${error.message}`</div>;
                 console.log('loadingConfig',dataConfig)
                  return data.foodsByVendor.length > 0 ? data.foodsByVendor.map((category, index) =>{
                    
                    var stripedHtml = category.title.replace(/<[^>]+>/g, '');
                    if(stripedHtml.length > 30){
                      stripedHtml = stripedHtml.substr(0, 30);
                    } 

                    var stripedHtml2 = category.description.replace(/<[^>]+>/g, '');
                    if(stripedHtml2.length > 60){
                      stripedHtml2 = stripedHtml2.substr(0, 60);
                    } 
                    return(
                     <Col lg="4" md="6" sm="12" xs="12" key={index}>
                      <div className="product-list store-item">
                      {category.img_url !== "" && category.img_url !== null ?
                          <img className="img-fluid" src={category.img_url} alt=""></img>
                        : <img className="img-fluid" src="../Assets/Img/placeholder-img.png" alt=""></img>
                         }
                         {category.brand_name}
                          <h3>
                          <span><strong>{stripedHtml}
                            {stripedHtml.length === 30 && 
                            <span>...</span>
                          }
                          </strong></span>
                            {/* {category.title} */}
                            </h3>
                            <p>Stock {category.stock}</p>
                          {/* <Text numberOfLines={1}>{category.title}</Text> */}
                          <p>
                            {/* {category.description} */}
                            <span><strong>{stripedHtml2}
                            {stripedHtml2.length === 60 && 
                            <span>...</span>
                          }
                          </strong></span>
                            </p>
                          {console.log("category>>",category)}

                          <p className="price">  ${getItemPrice(category,dataConfig)}</p>

                       
                         <a className="add-to-cart" href="#" onClick={(e) => 
                          {onAddToCart(category)
                            setMessage('Added!')
                            setMessagecolor('success');
                            setTimeout(() => {
                            setMessage('')
                            setMessagecolor('')}, 3000)
                          }
                          
                          }>Add to cart</a>
                       
                        </div>
                      </Col> 
                      )
                      }
                    ) :<Col lg="6">No Product Available</Col>
                    
                  }}
                </Query> 
                 }
                </Row>
            }


          </Container>
        </Row>
      </Container>

      <Container className="app-area" fluid>
              <Row>
                <Col lg="6" className="app-area-img">
                  <img src='../Assets/Img/bottom_img.png' ></img>
                </Col>
                <Col lg="6" className="app-area-text">
                  <h3>Dostava is Available for your Android or Apple</h3>
                  <a href="https://apps.apple.com/us/app/dostava/id1543132324">
                  <img src='../Assets/Img/appstore.png' ></img>
                    {/* <img src="../Assets/Img/footer-appstore.png"></img> */}
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.dostava">
                    {/* <img src="../Assets/Img/footer-googleplay.png"></img> */}
                    <img src='../Assets/Img/playstore.png'></img>
                  </a>
                  {/* <img src='../Assets/Img/playstore.png' ></img>
                  <img src='../Assets/Img/appstore.png' ></img> */}
                </Col>
              </Row>
        </Container>

      <Footer />


    </Container>


  )
}

export default VendorCategory;