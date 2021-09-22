import React, { Component, useState, useEffect , useRef } from "react";
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
import { foods, like,getVendorsByLocationAndKeyword ,getCategoriesByLocation , getConfiguration} from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import { Form, FormControl } from 'react-bootstrap';
import { getItemPrice } from '../utils/pricing'
import FlashAlert from "../Components/FlashAlert.jsx";
import Modal from "reactstrap/lib/Modal";
import ProductDetail from "../Components/ProductDetail.jsx";
import ReactPaginate from 'react-paginate';

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
const FOODS = gql`${getVendorsByLocationAndKeyword}`; 
const LIKE_PRODUCT = gql`${like}`;
const GETCARTITEMS = gql`${getCartItems}`;
const getVendorbyLocation = gql`${getCategoriesByLocation}`
const GET_CONFIGURATION = gql`${getConfiguration}`;

function SearchProduct(props){

 
  React.useEffect(() => {
    window.scrollTo(0, 0)
},[]);

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

 const [_id, setId] = useState(props.match.params?.id ?? null);

 const [filters, setFilter] = useState({ onSale: false, inStock: false, min: 0, max: 1000 });
 const [search, setSearch] = useState('');
 const [SearchText,setSearchText] = useState(props.location?.search?.replace("?q=", "") ?? '');

 const [lat,setLat] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lat ?? null : null)
 const [lng,setLng] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lng ?? null : null)

 const {loading,error,data : dataVendorLocation} = useQuery(getVendorbyLocation, { variables:{ lat : lat,long :lng} ,client : newclient })

 const [keyword , setKeyword] = useState(props.location?.search?.replace("?q=", "") ?? '')
 const [title ,setTitle] = useState(
  JSON.parse(localStorage.getItem('storeItem'))?.title ?? 'Single Categories'
   )
 const [description ,setDescription] = useState(
   JSON.parse(localStorage.getItem('storeItem'))?.description ?? null)

   
 const [messagealert , setMessage ] = useState('')
 const [messagecolor , setMessagecolor ] = useState('')

 const [message, setMessages] = useState('');
 const [VendorIds,setVendorIds] = useState([]);
 
 const [editModal, setEditModal] = useState(false)
 const [ItemDetail , setItemDetail ] = useState([]);

 const [page , setPage] = useState(0)
 const [pagination,setPagination] = useState(true);
 const [totalPage , setTotalPages] = useState(0)

 async function setVendorIdsArray(product){
   const cartItemsStr = await localStorage.getItem('cartItems')
   const cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : []
   let vendorIds = [];
   console.log("productproductproduct",product)

 }
 
 const toggleModal = (row) => {
  setEditModal(!editModal)
  setItemDetail(row)
}



 const [productFilter,setProductFilter] = useState('both')
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

 const myRef = useRef(null);

 function executeScroll() {
  myRef.current.scrollIntoView()
}

 function getVendors(){
   return   <Row>
   <Container id="Product-carousel">
     <Row>
         <Col lg="12" >
           <h2 className="title">Vendors</h2>
         </Col>
     </Row>
    
     <Row>
   <Query query={FOODS} fetchPolicy="network-only"  variables={{ keyword: keyword ,lat : lat,long : lng}}>
     {({ loading, error, data }) => {
      if (loading) return <div>{"Loading"}...</div>;
      if (error) return <div>`${"Error"}! ${error.message}`</div>;
      let counts = [];
     return data.getVendorsByLocationAndKeyword.vendors.map((category, index) =>{
         if(counts.length  <= 3 && category.vendor_available){
          counts.push(index)
        return   <Col lg="3" key={index}>
        <Link
            to={`/storesitem/${category._id}`}
            params="true"
            onClick={e => {
            e.preventDefault();
            let news = {
                title : category.business_name,
                description : category.name,
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
                <div className="product-img">
                {console.log('category.picture',category.picture)}
                  {category.picture !== "" && category.picture !== null ?
                  <img className="img-fluid" src={category.picture} alt=""></img>
                : <img className="img-fluid" src="../Assets/Img/store.png" alt="" ></img>
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
          </Col>
      
            }
           }
         )
       }}
     </Query>
    
     </Row>
     
     
   </Container>
 </Row>
 }

 function getProduct(){
   return <div ref={myRef}>
   <Row >
   <Container id="dry-fruits" className="all-products">
     <Row>
           <Col lg="12" >
             <h2 className="title">All Products</h2>
           </Col>
       </Row>  
 
      <Row>
        {!loadingConfig && !errorConfig && 
      <Query query={FOODS} variables={{ 
        keyword: keyword ,
        lat : lat,
        long : lng,
        page : page}}>
      {({ loading, error, data }) => {
         console.log('getVendorsByLocationAndKeyword',{ 
          keyword: keyword ,
          lat : lat,
          long : lng,
          page : page})
      if (loading) return <div>{"Loading"}...</div>;
      if (error) return <div>`${"Error"}! ${error.message}`</div>;
       
      if(page === 0){
        setTotalPages(data.getVendorsByLocationAndKeyword.totalCount);
        if(data.getVendorsByLocationAndKeyword.totalCount > 0){
          setPagination(true)
        }
        
      }

      console.log('getVendorsByLocationAndKeyword',data)
         
        return data.getVendorsByLocationAndKeyword.products.length > 0 ?
            data.getVendorsByLocationAndKeyword.products.map((category, index) =>{
                    
              var stripedHtml = category.title.replace(/<[^>]+>/g, '');
              if(stripedHtml.length > 30){
                stripedHtml = stripedHtml.substr(0, 30);
              } 

              var stripedHtml2 = category.user.business_name.replace(/<[^>]+>/g, '');
              if(stripedHtml2.length > 60){
                stripedHtml2 = stripedHtml2.substr(0, 60);
              } 
              console.log('categorycategory',data.getVendorsByLocationAndKeyword)
              return(

           <Col lg="4" md="6" sm="12" xs="12" key={index}>
            <div className="product-list">
                {
                  category.img_url !== "" && category.img_url !== null ?
                  <img className="img-fluid" src={category.img_url} alt=""  onClick={() => toggleModal(category)}></img>
                  : <img className="img-fluid" src="../Assets/Img/store.png" alt=""></img>
                }
                <h3>
                  <span>
                    <strong>{stripedHtml}
                            {stripedHtml.length === 30 && 
                      <span>...</span>
                        }
                    </strong>
                  </span>
                  </h3>
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
                  setMessage('Item Added!')
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
          )
          :  <Col lg="6">{'Not Available'}</Col> 
        }}
       
      </Query> 
       }


            {pagination &&
            <Col lg="12" className="issuesPagination pagination">
                <ReactPaginate
                    forcePage={page}
                    previousLabel="&larr;"
                    nextLabel="&rarr;"
                    // breakLabel={'...'}
                    // breakClassName={'break-me'} 
                    pageCount={Math.ceil(totalPage / 10)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(e) =>{
                      setPage(e.selected)
                      executeScroll()
                    }}
                  />
            </Col> }

      </Row>
      </Container>
  </Row>
  </div>
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
         <h2 className="title text-center">{"Search Product"}</h2>
       {/* <p className="content text-center">{description}</p> */}
         </Col>
       </Row>
     </Container>
     <Container id="search-product">
       <Row>
       <Col sm={3}>
        <select className="col-lg-12" value={productFilter} name="select-category" onChange={(e) => setProductFilter(e.target.value) 
           }>
            <option disabled >Select Please </option>
            <option value="vendor">Vendor</option> 
            <option value="products">Products</option>
            <option value="both" >Both</option>
        </select>
        </Col>
       <Col sm={7}>
             <FormControl type="search" placeholder="Search Product ..." 
             value={SearchText} onChange={(e) => {setSearchText(e.target.value)}} className=" col-lg-12" />
         </Col>
         <Col sm={2}>
            <Button variant="outline-success" onClick={() => setKeyword(SearchText)}>
                Search</Button>  
         {/* <Button variant="outline-success" onClick={(e) => {
             e.preventDefault();
             setSearch(SearchText)} }>Search</Button> */}
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
     
       {productFilter === 'vendor' && lat && lng  ? getVendors() 
        : productFilter === 'both'  &&   
        lat && lng ? getVendors() : null }

      {productFilter === 'products' && lat && lng  ? getProduct() 
              : productFilter === 'both'  &&   
              lat && lng ? getProduct() : null }
{/*      
     {lat && lng ? getVendors() : null }
     {lat && lng ? getProduct() : null } */}

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
                 </a>
                 <a href="https://play.google.com/store/apps/details?id=com.dostava">
                   <img src='../Assets/Img/playstore.png'></img>
                 </a>
                 
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
                
              <ProductDetail item={ItemDetail} configuration={dataConfig}  />
            </Modal>

     <Footer />


   </Container>


 )
    
}

export default SearchProduct
