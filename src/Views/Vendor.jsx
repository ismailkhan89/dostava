import React, { Component, useState, useEffect ,useContext, useRef} from "react";
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
import { foods, like,foodbyVendor ,getVendorByLocation , getConfiguration, foodbyFilter
,getVendorsByLocationAndKeyword} from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import { Form, FormControl } from 'react-bootstrap';
import { Redirect , useHistory , Link  } from "react-router-dom";
import { getItemPrice, isTimeBetween } from '../utils/pricing'
import ReactPaginate from 'react-paginate';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import FlashAlert from "../Components/FlashAlert.jsx";
import Modal from "reactstrap/lib/Modal";
import ProductDetail from "../Components/ProductDetail.jsx";
import ConfigurationContext from "../context/Configuration.js";
import Spinner from "reactstrap/lib/Spinner";
import moment, { now } from "moment";

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
const getVendorbyLocation = gql`${getVendorByLocation}`
const FOODSBYFILTER = gql`${foodbyFilter}`
const GET_CONFIGURATION = gql`${getConfiguration}`;
const FOODS_SEARCH = gql`${getVendorsByLocationAndKeyword}`; 

function Vendor(props) {

  

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


  React.useEffect(() => {
    window.scrollTo(0, 0)
  },[]);

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

  const [location, setLocation] = useState('');
  const [latLng, setlatLng] = useState('');

  const [messagealert , setMessage ] = useState('')
  const [messagecolor , setMessagecolor ] = useState('')
  const [searchValue , setsearchValue] = useState('')
  const [searchFlag , setSearchFlag] = useState(false)

  const [products,setProducts] = useState([])

  const [page , setPage] = useState(0)
  const [pagination,setPagination] = useState(true);
  const [totalPage , setTotalPages] = useState(0)

  const {loading : LoadingProduct,error : errorProduct,data : dataProduct} = 
  useQuery(FOODS_SEARCH, { onCompleted : onCompletedProduct ,variables:{    
    keyword: searchValue ,
    lat : lat,
    long : lng,
    page : page } ,client : newclient })

 
  function onCompletedProduct(){
    console.log("dataProduct>>>>",dataProduct)
    console.log("page>>>>",page)
    if(page === 0){
      setTotalPages(Math.ceil(dataProduct.getVendorsByLocationAndKeyword.totalCount / 10) - 1);
      if(dataProduct.getVendorsByLocationAndKeyword.totalCount > 0){
        setPagination(true)
      }
      setProducts(dataProduct.getVendorsByLocationAndKeyword.products)
    }else{
      let newArray = products.concat(dataProduct.getVendorsByLocationAndKeyword.products)
      setProducts([
        ...newArray,
        ])
    }   
   
  }

  function handleSelect(address){
    setLocation(address)
   geocodeByAddress(address)
     .then(results => getLatLng(results[0]))
     .then(latLng => {
       setlatLng(latLng)
       localStorage.removeItem('location');
       // console.log('Success', latLng)
     })
     .catch(error => console.error('Error', error));
 };

 const searchOptions = {
  componentRestrictions: { country: ['aus'] },
}
 
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
  const [editModal, setEditModal] = useState(false)
  const [ItemDetail , setItemDetail ] = useState([]);

  const toggleModal = (row) => {
    setEditModal(!editModal)
    setItemDetail(row)
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
     if(selectedItem && selectedItem.length > 0 ){
      if(selectedItem[0].quantity === product.stock || selectedItem[0].quantity > product.stock){
        setEditModal(false)
        setMessagecolor('warning');
        setMessage('We are out stock, we only have '+product.stock+ ' '+ product.title +' in stock')
        return null
      }
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
        setEditModal(false)
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
        setEditModal(false)
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
        setEditModal(false)
        setMessagecolor('success');
        setMessage('Added!')
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



  function executeScroll() {
    myRef.current.scrollIntoView()
  }


  const m = moment(new Date());
  const curentTime = m.format('HH:mm');

   

// let shopClosTimeIsBeforeCurntTime = offday === true ? false : isTimeBetween(startTime, lastOrderTime, curentTime);

   const myRef = useRef(null);
  return (
    <Container className="wrapper" fluid>
    <Header  {...props} title="Stores by Dostava" />
    <FlashAlert message={messagealert} color={messagecolor} />

      <Container className="breadcrumb-area" style={{display:'none'}} fluid>
        <Row>
          <Col lg="3">
          </Col>
          <Col lg="3" className="breadcrumb-section">
            <h3>Stores</h3>
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
          <h2 className="title text-center">Stores</h2>
					 <p className="content text-center">Stores delivering in your area.</p>
          </Col>
        </Row>
      </Container>
      <Container id="search-product">
        <Row>


              <Col sm={10}>
              <input 
                value={searchValue}
                type="text" 
                placeholder="Search Product" 
                className="mr-sm-2 col-lg-12" 
                onKeyPress={(e) => {
                    if(e.key==="Enter"){
                      e.target.value === '' && setSearchFlag(false)
                      setsearchValue(e.target.value)
                      setSearchFlag(true)
                    }
                }}
                onChange={(e) => {
                  e.target.value === '' && setSearchFlag(false)
                  setsearchValue(e.target.value)
                  setPage(0)
                }}
                />
            </Col>
            <Col sm={2}>
              <Button variant="outline-success" 
                  onClick={() => 
                  searchValue !== '' ?
                  setSearchFlag(true) : setSearchFlag(false)}>
                    
                    <FontAwesome 
								// style={{position : 'absolute'}}
								// onClick={() => onChangeIcon()}
								name="search" size={'lg'} />
                  </Button>
            </Col>
        </Row>

        <Row>
          
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg="12">
            <h4>{message}</h4>
          </Col>
        </Row>
      </Container>
      {!searchFlag &&
      <Container className="content-area new-products-addition" fluid>
   
        <Row>
          <Container id="Product-carousel" className="border-head">
            

            <Row>
                <Col lg="12" >
                  <h2 className="title">Stores</h2>
                  <hr/>
                </Col>
            </Row>

            <Row>
            <Query query={getVendorbyLocation} variables={{ lat : lat,long :lng}}>
            {({ loading, error, data }) => {
             if (loading) return <div>{"Loading"}...</div>;
             if (error) return <div>`${"Error"}! ${error.message}`</div>;
             {console.log('data',data)}

              return data.getVendorsByLocation.length > 0 ? data.getVendorsByLocation.map((category, index) =>
                {

                let shopClosTimeIsBeforeCurntTime = category.timeTable.off_day === true ? false : isTimeBetween(category.timeTable.start_time, category.timeTable.last_order_time, curentTime);
                console.log('category category',category)
                // console.log('shopClosTimeIsBeforeCurntTime',shopClosTimeIsBeforeCurntTime)
                return  <Col lg="4" key={index}>
                  {shopClosTimeIsBeforeCurntTime ? 
                <Link
                    to={`/storesitem/${category._id}`}
                    params="true"
                    onClick={e => {
                      console.log("mall pressed", category._id)
                    e.preventDefault();
                    let news = {
                        title : category.business_name,
                        description : category.name,
                        location : category.physical_address
                    };
                    localStorage.setItem('storeItem',JSON.stringify(news));
                    props.history.push({
                     pathname: `/storesitem/${category._id}`,
                      state : {
                        title : category.business_name,
                        description : category.name,
                        category : data.getVendorsByLocation,
                        // categoryid : category._id
                      }
                    })
                    }}
                  > 
                  <div className="product">
                  <div className="productmsg">   
                          {/* <h5 style={{  color: 'white',fontWeight : 'bold'}}>This shop is offline</h5> */}
                          <FontAwesome name="circle" /> 
                      </div>
                        <div className="product-img">
                        {console.log('category.picture',category.picture)}
                          {category.picture !== "" && category.picture !== null ?
                          <img className="img-fluid" src={category.picture} alt=""></img>
                        : <img className="img-fluid" src="../Assets/Img/store.png" alt=""></img>
                         }

                        {/* <img className="img-fluid" src={category.picture} alt=""></img> */}
                        </div>
                        <div className="product-desc">
                        <h3 className="product-title">{category.business_name}</h3>
                        {/* <p className="product-content">{category.name}</p> */}
                        {/* <p class="price">$24.03</p> */}
                        </div>
                    </div>
                   </Link>
                    :   
                    <div className="productoffline">
                      <div className="productmsg">   
                          {/* <h5 style={{  color: 'white',fontWeight : 'bold'}}>This shop is offline</h5> */}
                          <FontAwesome name="circle" /> 
                      </div>

                      <div className="product-img">
                        {category.picture !== "" && category.picture !== null ?
                        <img className="img-fluid" src={category.picture} alt=""></img>
                      : <img className="img-fluid" src="../Assets/Img/store.png" alt=""></img>
                        }
                      </div>
                      <div className="product-desc">
                      <h3 className="product-title">{category.business_name}</h3>
                      {/* <p className="product-content">{category.name}</p> */}
                      </div>
                    </div>
                    }
                  </Col>
                }
                )

                :   <React.Fragment>
                <Col lg="4" className="text-center">
                </Col>
                <Col lg="4" className="text-center">
                Currently, there is no vendor available at this location
                </Col>
                <Col lg="4" className="text-center">
                </Col>
                </React.Fragment>
                
                
              }}
            </Query>
            </Row>

            {/* <Row>
              <Col lg="12">
                <Link to="#" className="learn-more">Load More</Link>
              </Col>
            </Row> */}
            
          </Container>
        </Row> 
      </Container>}

      {searchFlag && searchValue !== '' &&
      <Container className="content-area" fluid> 
          <Row>
            <Container id="dry-fruits" className="all-products">
   
      <>
        <Row>
          <Col lg="12" >
            <h2 className="title">Search Products</h2>
          </Col>
        </Row>
        <div ref={myRef}>
        <Row>

          
        {products.length > 0 ?
        products.map((category, index) =>{
                    
              var stripedHtml = category.title.replace(/<[^>]+>/g, '');
              if(stripedHtml.length > 30){
                stripedHtml = stripedHtml.substr(0, 30);
              } 

              var stripedHtml2 = category.user.business_name.replace(/<[^>]+>/g, '');
              if(stripedHtml2.length > 60){
                stripedHtml2 = stripedHtml2.substr(0, 60);
              } 
              console.log('category>>>>>>>12345',category)
              return(

           <Col lg="4" md="6" sm="12" xs="12" key={index}>
            <div className="product-list">
                {
                  category.img_url !== "" && category.img_url !== null ?
                  <img className="img-fluid" src={category.img_url} alt=""  onClick={() => toggleModal(category)}></img>
                  : <img className="img-fluid" src="../Assets/Img/store.png" alt=""></img>
                }
                <p><strong> Brand Name : {category.brand_name}</strong></p>  
                <h3>
                  <span>
                    <strong>{stripedHtml}
                            {stripedHtml.length === 30 && 
                      <span>...</span>
                        }
                    </strong>
                  </span>
                  {/* {category.title} */}
                  </h3>
                <p>Package Weight : {category.package_weight} {category.packaging_unit}</p>  
                <p>
                  <span><strong>{stripedHtml2}
                            {stripedHtml2.length === 60 && 
                            <span>...</span>
                          }
                          </strong></span>
                  {/* {category.description} */}
                  </p>
                <p className="price">  $ {category.vendor_pricing}</p>
                {/* <p className="price">  ${getItemPrice(category,dataConfig)}</p> */}
               <a className="add-to-cart" href="#" onClick={(e) => 
                {onAddToCart(category)
                  // setMessage('Item Added!')
                  // setMessagecolor('success');
                  setTimeout(() => {
                  setMessage('')
                  setMessagecolor('')}, 3000)
                }
                
                }>Add to cart</a>
             
              </div>
            </Col> 
            )
          }
          )
          :  <Col lg="6">{'Not Available'}</Col> }
       
 
{/* 
<Query query={FOODSBYFILTER} variables={{  lat : lat,long : lng,search : searchValue}}>
                {({ loading, error, data }) => {
                if (loading) return <div>{"Loading"}...</div>;
                if (error) return <div>`${"Error"}! ${error.message}`</div>;
                  return data.foodByFilters.length > 0 ? data.foodByFilters.map((category, index) =>{
                    
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
                          <img className="img-fluid" src={category.img_url} alt="" onClick={() => toggleModal(category)}></img>
                        : <img className="img-fluid" src="../Assets/Img/placeholder-img.png" alt=""></img>
                         }
                         {category.brand_name}
                          <h3>
                          <span><strong>{stripedHtml}
                            {stripedHtml.length === 30 && 
                            <span>...</span>
                          }
                          </strong></span>
                            </h3>
                            <p>Stock {category.stock}</p>
                            <p>Package Weight : {category.package_weight}</p>  
                          <p>
                            <span><strong>{stripedHtml2}
                            {stripedHtml2.length === 60 && 
                            <span>...</span>
                          }
                          </strong></span>
                            </p>
                          {console.log("category>>",category)}

                          <p className="price">  $ {category.vendor_pricing}</p>

                       
                         <a className="add-to-cart" href="javascript:void" onClick={(e) => 
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
                </Query> */}
                </Row>

                {products.length > 0  &&  <Row>
            <Col lg="12"  className="text-center">
        {!LoadingProduct ? parseFloat(page) !== parseFloat(totalPage) &&  pagination && 
         <Button 
            onClick={() => {
              if(parseFloat(page + 1) <= parseFloat(totalPage)){
                setPage(page + 1)
              }
            }}
          variant="outline-success">
          Load More</Button>
          : 
          <Spinner />}
          </Col>
          </Row> }
                </div>
                 </>
         </Container>       
        </Row> 
    </Container>}
      <Container className="app-area" fluid>
              <Row>
                <Col lg="6" className="app-area-img">
                  {/* <img src='../Assets/Img/Mobile-Mockups.png' ></img> */}
                  <img src='../Assets/Img/bottom_img.png' ></img>
                </Col>
                <Col lg="6" className="app-area-text">
                  <h3>Dostava is Available for your Android or Apple Device</h3>
                  <a href="https://apps.apple.com/us/app/dostava/id1543132324">
                    
                  <img src='../Assets/Img/appstore.png' ></img>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.dostava">
                    <img src='../Assets/Img/playstore.png' ></img>
                  </a>

                  {/* <img src='../Assets/Img/playstore.png' ></img>
                  <img src='../Assets/Img/appstore.png' ></img> */}
                </Col>
              </Row>
        </Container>

       <Modal
            className="modal-dialog-centered"
            size="lg"
            
            isOpen={editModal}
            toggle={() => { toggleModal()}}
            >
                {/* <OrderDetails row={OrderDetail} configuration={configuration}  /> */}
                
              <ProductDetail item={ItemDetail} close={()=>setEditModal(!editModal)} configuration={dataConfig}  />
        </Modal>
      <Footer />


    </Container>


  )
}

export default Vendor;