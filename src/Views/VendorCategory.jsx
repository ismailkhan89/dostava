import React, { Component, useState, useEffect , useRef , useContext} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';

import FontAwesome from 'react-fontawesome'
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  Alert,
  
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem

} from "reactstrap";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation  } from '@apollo/react-hooks';
import { foods, like,foodByIds ,getCategoriesByLocation , getConfiguration , foodbyVendorId_New} from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import { Form, FormControl } from 'react-bootstrap';
import { getItemPrice } from '../utils/pricing'
import FlashAlert from "../Components/FlashAlert.jsx";
import ReactPaginate from 'react-paginate';
import ProductDetail from '../Components/ProductDetail';
import ConfigurationContext from "../context/Configuration.js";
import Spinner from "reactstrap/lib/Spinner";

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
// const FOODS = gql`${foodbyVendorId}`; 
const FOODS = gql`${foodbyVendorId_New}`; 
const LIKE_PRODUCT = gql`${like}`;
const GETCARTITEMS = gql`${getCartItems}`;
const getVendorbyLocation = gql`${getCategoriesByLocation}`
const GET_CONFIGURATION = gql`${getConfiguration}`;
const FOOD_BY_IDS = gql`${foodByIds}`

const useMountEffect = fun => useEffect(fun, []);

function VendorCategory(props) {

  const config = useContext(ConfigurationContext)


    useEffect(() => {
      window.scrollTo(0, 0)
    },[]);

    const myRef = useRef(null);


    function executeScroll() {
      myRef.current.scrollIntoView()
    }
    // const executeScroll = () => myRef.current.scrollIntoView();


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
  const [page , setPage] = useState(0)
  const [totalPage , setTotalPages] = useState(0)
  const [pagination,setPagination] = useState(false);
  const [lat,setLat] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lat ?? null : null)
  const [lng,setLng] = useState(localStorage.getItem('location')? JSON.parse(localStorage.getItem('location'))?.lng ?? null : null)

  const [filterddl , setFilterDdl] = useState(false)
  const [sort , setSort] = useState('');
  // const [lat, setLat] = useState(props.location?.state?.location?.lat.toString() ?? null);
  // const [lng, setLng] = useState(props.location?.state?.location?.lng.toString() ?? null);
  const [editModal, setEditModal] = useState(false)
const [ItemDetail , setItemDetail ] = useState([]);

  const {loading,error,data : dataVendorLocation} = useQuery(getVendorbyLocation, { variables:{ lat : lat,long :lng} ,client : newclient })

  const [products,setProducts] = useState([])
  const item = [];

  const {loading : LoadingProduct,error : errorProduct,data : dataProduct} = 
  useQuery(FOODS, { onCompleted : onCompletedProduct ,variables:{ vendor_id: _id , ...filters,
    search: search.toLowerCase(),lat : lat,long : lng,page : page,
    sort_by : sort } ,client : newclient })

  const [cartItems, setCartItems] = useState([])
  const [totalProducts,setTotalProducts] = useState(0)
    useEffect(() => {
      didFocus()
    },[])
    useEffect(() => {
      if(SearchText === ''){
        setSearch('')
      }
    },[SearchText])
   
    function onCompletedProduct({ foodByVendorId_new }){
      console.log('foodByVendorId_new',dataProduct.foodByVendorId_new)
     
      if(page === 0){
        setTotalProducts(dataProduct.foodByVendorId_new.totalCount)
        setTotalPages(Math.ceil(dataProduct.foodByVendorId_new.totalCount / 10) - 1);
        if(dataProduct.foodByVendorId_new.totalCount > 0){
          setPagination(true)
        }
        setProducts(dataProduct.foodByVendorId_new.products)
      }
      else{
        if(dataProduct.foodByVendorId_new.products.length > 0){
          let newArray = products.concat(dataProduct.foodByVendorId_new.products)
          setProducts([
            ...newArray,
            ])
        }
        else{
          setProducts([])
        }


      }

      
     
    }

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

  const toggleModal = (row) => {
    setEditModal(!editModal)
    setItemDetail(row)
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

  // useEffect(() => {
  //   didFocus()
  // },[])

  async function didFocus() {
    try {
      const cartItemsStr = await localStorage.getItem('cartItems')
      console.log("cartItemsStr>>>",cartItemsStr)
      const cartItems = JSON.parse(cartItemsStr)
      console.log("<<cartItems>>>",cartItems)
      const validatedItems = []
      if (cartItems && cartItems.length) {
        const ids = cartItems.map(({ _id }) => _id)
        console.log("<<cartItems>>>ids",ids)
        const { data: { foodByIds } } = await client.query({ query: FOOD_BY_IDS, variables: { ids }, fetchPolicy: 'network-only' })
        const transformCart = cartItems.map(cartItem => {
          console.log(foodByIds)
          const food = foodByIds.find(food => food._id === cartItem._id)
          console.log(" ",food)
          if (!food)
            return null
          const variation = food.variations.find(variation => variation._id === cartItem.variation._id)
          if (!variation)
            return null
          if (!food.stock)
            return null
          if (food.stock < cartItem.quantity) {
            cartItem.quantity = food.stock
          }

          // let title = `${food.title}${variation.title ? '('+variation.title+')' : ''}`
          let title = `${food.title}`
          let price =  parseFloat(food.vendor_pricing)
       
          // price = parseFloat(getItemPrice(food,dataConfig))
          if (cartItem.addons)
            cartItem.addons.forEach(addon => {
              const cartAddon = variation.addons.find(add => add._id === addon._id)
              addon.options.forEach(option => {
                const optionfound = cartAddon.options.find(opt => opt._id === option._id)
                price += optionfound.price
              })
            })
            console.log("<<cartItems>>>ready to push",cartItem)
          
            validatedItems.push({
              ...cartItem,
              img_url: food.img_url,
              title: title,
              price: price.toFixed(2)
            })

          console.log("<<validatedItems pushed>>>",validatedItems)
          return {
            ...cartItem,
            img_url: food.img_url,
            title: title,
            price: price.toFixed(2)
          }
        })
        console.log("<<updating client cart items>>>",validatedItems)
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: validatedItems.length } })
        await localStorage.setItem('cartItems', JSON.stringify(validatedItems))

        // if (props.navigation.isFocused()) {
          setCartItems(transformCart.filter(item => item))
          setVendorIdsArray(transformCart.filter(item => item))
        // }
      }
      else{
        setCartItems([])
      }
      
    } catch (e) {
     
      // showMessage({
      //   message: 'Error occured',
      //   duration: 3000,
      //   type: 'warning',
      //   floating: true,
      //   style: styles.alertboxRed,
      //   titleStyle: { fontSize: scale(14), fontFamily: fontStyles.MuseoSans500 }
      // })
    }
  }


  async function onAddToCart (product)  {

    let vIds = await localStorage.getItem("vendorIds");
    const cartItemsStr = await localStorage.getItem('cartItems') || '[]'
    const cartItems = JSON.parse(cartItemsStr)
     const selectedItem = cartItems.filter((itm) => itm._id === product._id)
     console.log("selectedItem>>>>>>>>>>123456>",selectedItem)
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
        setCartItems(cartItems)
        setEditModal(false)
        setMessagecolor('success');
        setMessage('Added!')
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }
    getAddedQty(product)
    
  }


   function getAddedQty(item){
     const selectedItem = cartItems.find((itm) => itm._id === item._id)
     if(selectedItem){
      return selectedItem.quantity
     }
     return '0'
    }

    async function addQuantityToCartItem (newItem) {
   
      //  setLoader(true)
      const cartItemsStr = localStorage.getItem('cartItems') || '[]'
      const cartItems = JSON.parse(cartItemsStr)

      const index = cartItems.findIndex((product) => product._id === newItem._id)
      if (index < 0){
          onAddToCart(newItem)
           setTimeout(() => {
            setMessage('')
            setMessagecolor('')}, 3000)
            return
          }
          // cartItems.push(newItem)
      else {
          cartItems[index].quantity = cartItems[index].quantity + 1
          cartItems[index].vendor_quantity = cartItems[index].vendor_quantity + 1
      }

      
      await localStorage.setItem('cartItems', JSON.stringify(cartItems))
      setCartItems(cartItems);
      getAddedQty(newItem)
      // didFocus()
      
    
  }

  async function removeQuantityToCartItem (newItem) {
    let vIds = await localStorage.getItem("vendorIds");
    const vendorIds = vIds === null ? [] : JSON.parse(vIds);
    console.log('vendorIds>>',vendorIds)
    const cartItemsStr = await localStorage.getItem('cartItems') || '[]'
    const cartItems = JSON.parse(cartItemsStr)
    console.log('cartItems>>',cartItems)
    const index = cartItems.findIndex((product) => product._id === newItem._id)
    const filteredItem = cartItems.find((product) => product._id === newItem._id)
    
    console.log('index>>',index)
    if(filteredItem){
    // const selectedItemVendorId = index[0].vendor;
    // console.log('selectedItemVendorId',selectedItemVendorId)
   

      if(cartItems[index].quantity > 0){
        cartItems[index].quantity = cartItems[index].quantity - 1
        cartItems[index].vendor_quantity = cartItems[index].vendor_quantity - 1
      }

    if(cartItems[index]?.quantity <= 0){
      const items = cartItems.filter((product) => product._id !== newItem._id)
      await localStorage.setItem('cartItems', JSON.stringify(items))
      client.writeQuery({ query: GETCARTITEMS, data: { cartItems: items.length } })
      setCartItems(items);
    }
    else{
      await localStorage.setItem('cartItems', JSON.stringify(cartItems))
      setCartItems(cartItems);
    }
    getAddedQty(newItem)
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
              value={SearchText} onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => {
                if(e.key=== "Enter"){
                  //setProducts([])
                  //setSearchText(e.target.value)
                  //setSearchText(e.target.value)
                    // setProducts(search !== e.target.value ?[] : products)
                    setPage(0)
                    setSearch('')
                    setSearch(e.target.value)
                }
            }}
              className="mr-sm-2 col-lg-12" />
          </Col>
          <Col sm={2}>
          
            <Button variant="outline-success" onClick={() => {
              // if(SearchText !== search){
              //   setProducts([])
              //   setSearch(SearchText)
              // }
              setPage(0)
              setSearch('')
              setSearch(SearchText)
            }}>
                Search</Button>  
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
      <Container className="content-area new-products-addition" fluid>
      

      {search === '' && <Row>
          <Container id="Product-carousel" className="border-head">
            
          {_id && lat && lng && search === '' &&
          <>
            <Row>
                <Col lg="12" >
                  <h2 className="title">New Products</h2>
                  <hr/>
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

          <Query query={FOODS} variables={{ vendor_id: _id ,lat : lat,long : lng , page : 0 }}>
            {({ loading, error, data }) => {
             if (loading) return <div>{"Loading"}...</div>;
             if (error) return <div>`${"Error"}! ${error.message}`</div>;
            
            return data.foodByVendorId_new.products.length > 0 ? data.foodByVendorId_new.products.map((category, index) =>{
             
                if(index  <= 3){
               return  <Col lg="3" key={index}>
                  <div className="product" onClick={() => toggleModal(category)}>
                    <div className="product-imgs">
                    

                    {category.img_url !== "" && category.img_url !== null ? 
                      <img className="img-fluid" src={category.img_url} alt=""></img>
                    :  <img className="img-fluid" src="../Assets/Img/placeholder-img.png" alt="" ></img>
                    }
                    </div>
                    <div className="product-desc">

                      <h3 className="product-title">{category.title}</h3>
                      <p className="product-content">{category.description}</p>
                    </div>
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
          
        </Row> }  

        <div  ref={myRef}>
          <Container id="dry-fruits" className="all-products search-Product border-head">
          <Row>
                <Col lg="12" >
                  <h2 className="title"> {search ? "Search" : "All"} Products</h2>
                  <hr/>
                  <Dropdown isOpen={filterddl} toggle={() => {
                  setFilterDdl(!filterddl)
                }}>
                  <DropdownToggle caret>
                  {sort ? sort : 'Sort by'}  
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem 
                    onClick={() => {
                      setSort('asc')
                      setPage(0)
                    }}>
                      <div>
                        
                          Asc
                        
                     {sort === 'asc' &&
                      <FontAwesome name="check" size={20} />
                     }   
                      </div>

                    </DropdownItem>
                    <DropdownItem 
                     onClick={() => {
                      setSort('desc')
                      setPage(0)
                    }}>  <div>
                    Desc
                 {sort === 'desc' &&
                  <FontAwesome name="check" size={20} />
                 }   
                  </div></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </Col>


                
            </Row>

              { _id && lat && lng && 
                <Row>
                  {!loadingConfig && !errorConfig && 
                // <Query query={FOODS} variables={{ vendor_id: _id , ...filters,
                //   search: search,lat : lat,long : lng,page : page}}>
                // {({ loading, error, data }) => {
                // if (loading) return <div>{"Loading"}...</div>;
                // if (error) return <div>`${"Error"}! ${error.message}`</div>;

                // if(page === 0){
                //   setTotalPages(data.foodByVendorId_new.totalCount);
                //   if(data.foodByVendorId_new.totalCount > 0){
                //     setPagination(true)
                //   }
                  
                // }

              
                 products.length > 0 ? 
                  <React.Fragment> 
                    {products.map((category, index) =>{
                      console.log('category',category)
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
                            {/* {category.title} */}
                            </h3>
                            {/* <p>Stock {category.stock}</p> */}
                            <p>Package Weight : {category.package_weight} {category.packaging_unit}</p>  
                          {/* <Text numberOfLines={1}>{category.title}</Text> */}
                          <p>
                            {/* {category.description} */}
                            <span><strong>{stripedHtml2}
                            {stripedHtml2.length === 60 && 
                            <span>...</span>
                          }
                          </strong></span>
                            </p>

                          <p className="price">  ${category.vendor_pricing}</p>

                          <div className="popup-btns display-flex">
                          {/* <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                            <InputGroup>
                              <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
                              <FormControl
                                type="text"
                                placeholder="Input group example"
                                aria-label="Input group example"
                                aria-describedby="btnGroupAddon"
                              />
                            </InputGroup>
                          </ButtonToolbar> */}
                          <button onClick={e => {
                                        e.preventDefault()
                                        removeQuantityToCartItem(category)
                                        }} >
                                <FontAwesome name="minus"></FontAwesome>
                              </button> <span>{getAddedQty(category)}</span> <button onClick={e => {
                                        e.preventDefault()
                                        addQuantityToCartItem(category)
                                        }}>
                                <FontAwesome name="plus"></FontAwesome>
                              </button>
                          </div>

                         <a className="add-to-cart" href="#" onClick={(e) => 
                          {onAddToCart(category)
                        
                            e.preventDefault()
                            setTimeout(() => {
                            setMessage('')
                            setMessagecolor('')}, 3000)
                          }
                          
                          }>Add to cart</a>
                       
                        </div>
                      </Col> 
                      )
                      }
                    )} 
                 
                    
                     </React.Fragment>  : !LoadingProduct && <Col lg="6">No Product Available</Col>
                    
                  }
                {/* </Query>  */}
                 {/* } */}
              

           {/* {pagination && <Col lg="12" className="issuesPagination pagination">
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
                              // window.scrollTo(50,50);
                            }}
                            // containerClassName={'pagination'}
                            // activeClassName={'active'}
                          />
                    </Col> } */}
                </Row>
            }


      {products.length < totalProducts && parseFloat(page) < parseFloat(totalPage) && products.length > 0  &&  <Row>
            <Col lg="12"  className="text-center load-more-button">
        {parseFloat(page) < parseFloat(totalPage) &&  pagination && 
        !LoadingProduct ?
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


          </Container>
        </div>
      </Container>

        
      <Modal
            className="modal-dialog-centered"
            size="lg"
            isOpen={editModal}
            toggle={() => { toggleModal()
              didFocus()
              getAddedQty(ItemDetail)
            }}
            >
             
              <ProductDetail item={ItemDetail}
              toggle={() => { 
                toggleModal()
                didFocus()
                getAddedQty(ItemDetail)
              }}
              close={()=>setEditModal(!editModal)}
              configuration={dataConfig}  />
            </Modal>

      <Container className="app-area" fluid>
              <Row>
                <Col lg="6" className="app-area-img">
                  <img src='../Assets/Img/bottom_img.png' ></img>
                </Col>
                <Col lg="6" className="app-area-text">
                  <h3>Dostava is Available for your Android or Apple Device</h3>
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