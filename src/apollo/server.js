export const getFoods = `query Foods{
    foods{
      _id
      title
      description
      stock
      tag
      img_url
      is_gst
      is_frozen
      package_weight
      brand_name
      dostava_commission
      vendor_pricing
      variations{
        _id
        title
        price
        discounted
        addons{
          _id
          title
          description
          quantity_minimum
          quantity_maximum
          options{
            _id
            title
            price
          }
        }
      }
      user{
        _id
        name
    }
      category{
          _id
          title
      }
    }
  }`

  export const getCoupon = `mutation Coupon($coupon:String!){
    coupon(coupon:$coupon){
      _id
      code
      discount
      enabled
    }
  }`
  
  export const foodByIds = `query FoodByIds($ids:[String!]!){
    foodByIds(ids: $ids) {
      _id
      title
      description
      likes
      liked
      img_url
      stock
      category {
        _id
      }
      variations {
        _id
        title
        price
        discounted
        addons {
          _id
          title
          description
          quantity_minimum
          quantity_maximum
          options {
            _id
            title
            description
            price
          }
        }
      }
    }
  }`

export const createFood = `
  mutation CreateFood($foodInput:FoodInput!){
      createFood(
          foodInput:$foodInput
      ){
        _id
        title
        img_url
        description
        stock
        tag
        variations{
          _id
          title
          price
          discounted
          addons{
            _id
            title
            description
            quantity_minimum
            quantity_maximum
            options{
              _id
              title
              price
            }
          }
        }
        user{
          _id
          name
        }
        category{
          _id
          title
      }
      }
    }`

export const editFood = `
    mutation EditFood($foodInput:FoodInput!){
        editFood(
            foodInput:$foodInput
        ){
          _id
          title
          img_url
          description
          stock
          tag
          variations{
            _id
            title
            price
            discounted
            addons{
              _id
              title
              description
              quantity_minimum
              quantity_maximum
              options{
                _id
                title
                price
              }
            }
          }
          category{
            _id
            title
        }
        }
      }`
export const foods = `
      query FoodByCategory($category:String!,$onSale:Boolean,$inStock:Boolean,$min:Float,$max:Float,$search:String){
          foodByCategory(category:$category,onSale:$onSale,inStock:$inStock,min:$min,max:$max,search:$search){
            _id
            title
            description
            user{
              _id
              name
            }
            variations{
              _id
              title
              price
              discounted
              addons{
                _id
                title
                description
                quantity_minimum
                quantity_maximum
                options{
                  _id
                  title
                  description
                  price
                }
              }
            }
            category{_id}
            img_url
            likes
            stock
            liked
            stock
          }
        }`
export const getFeaturedProducts = `
        query getFeaturedProducts{
          getFeaturedProducts{
          is_featured
          title
          is_active
          img_url
          tag
          description
          variations{
            _id
            title
            price
            discounted
            addons{
              _id
              title
              description
              quantity_minimum
              quantity_maximum
              options{
                _id
                title
                description
                price
              }
            }
          }
          category{_id}
          brand_name
            category {
            description
            img_menu
            }
          }
        }`
export const deleteFood = `
      mutation DeleteFood($id:String!){
        deleteFood(id:$id){
          _id
        }
      }`

export const getCategories = `query Categories{categories{
        _id
        title
        description
        img_menu
      }}`

export const getVendors = `query getVendors{getVendors{
  _id
  name
  is_shop_keeper
}}`

export const createCategory = `
mutation CreateCategory($title:String!,$description:String!,$img_menu:String){
  createCategory(category:{title:$title,description:$description,img_menu:$img_menu}){_id}
}`


export const editCategory = `
      mutation EditCategory( $_id:String,$title:String!,$description:String!,$img_menu:String){
        editCategory(category:{_id:$_id,title:$title,description:$description,img_menu:$img_menu}){_id}
      }`

export const deleteCategory = `
      mutation DeleteCategory($id:String!){
        deleteCategory(id:$id){
          _id
        }
      }`
export const getOrders = `query Orders($page:Int, $user_id:String, $starting_date:String, $ending_date:String ){
  allOrders(page:$page,user_id:$user_id,starting_date:$starting_date,ending_date:$ending_date){
    order{
    _id
    delivery_address{
    latitude
    longitude
    delivery_address
    details
    label
    }
    delivery_charges
    order_amount
    paid_amount
    payment_method
    order_id
    user{
    _id
    name
    email
    phone
    }
    items{
    _id
    food{
    _id
    title
    description
    img_url
    user{
    _id
    name
    email
    phone
    }
    }
    vendor{
    _id
    name
    }
    variation{
    _id
    title
    price
    discounted
    }
    addons{
    _id
    title
    description
    quantity_minimum
    quantity_maximum
    options{
    _id
    title
    price
    }
    }
    quantity
    }
    reason
    status
    payment_status
    order_status
    createdAt
    calculations{
    dostava_gst
    vendor_gst
    dostava_amount
    vendor_amount
    total_amount
    }
    review{
    _id
    rating
    description
    }
    rider{
    _id
    name
    }
    
    }
    calculate{
    dostava_gst
    vendor_gst
    dostava_amount
    vendor_amount
    total_amount
    }
    }
}`

export const getDashboardTotal = `query GetDashboardTotal($startingDate: String, $endingDate: String){
  getDashboardTotal(starting_date: $startingDate, ending_date: $endingDate){
    total_orders
    total_users
    total_sales
  }
}`
export const getDashboardSales = `query GetDashboardSales($startingDate: String, $endingDate: String){
  getDashboardSales(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      amount
    }
  }
}`
export const getDashboardOrders = `query GetDashboardOrders($startingDate: String, $endingDate: String){
  getDashboardOrders(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      count
    }
  }
}`

export const getDashboardData = `query GetDashboardData($startingDate: String, $endingDate: String){
  getDashboardData(starting_date: $startingDate, ending_date: $endingDate){
    total_orders
    total_users
    total_sales
    orders{
      day
      count
      amount
    }
  }
}`

export const getConfiguration = `query GetConfiguration{
  configuration{
    _id
    order_id_prefix
    email
    password
    enable_email
    client_id
    client_secret
    sandbox
    publishable_key
    secret_key
    delivery_charges
    currency
    currency_symbol
  }
}`

export const saveOrderConfiguration = `mutation SaveOrderConfiguration($configurationInput:OrderConfigurationInput!){
  saveOrderConfiguration(configurationInput:$configurationInput){
    _id
    order_id_prefix
  }
}`
export const saveEmailConfiguration = `mutation SaveEmailConfiguration($configurationInput:EmailConfigurationInput!){
  saveEmailConfiguration(configurationInput:$configurationInput){
    _id
    email
    password
    enable_email
  }
}`
export const saveMongoConfiguration = `mutation SaveMongoConfiguration($configurationInput:MongoConfigurationInput!){
  saveMongoConfiguration(configurationInput:$configurationInput){
    _id
    mongodb_url
  }
}`

export const savePaypalConfiguration = `mutation SavePaypalConfiguration($configurationInput:PaypalConfigurationInput!){
  savePaypalConfiguration(configurationInput:$configurationInput){
    _id
    client_id
    client_secret
    sandbox
  }
}`

export const saveStripeConfiguration = `mutation SaveStripeConfiguration($configurationInput:StripeConfigurationInput!){
  saveStripeConfiguration(configurationInput:$configurationInput){
    _id
    publishable_key
    secret_key
  }
}`
export const saveDeliveryConfiguration = `mutation SaveDeliveryConfiguration($configurationInput:DeliveryConfigurationInput!){
  saveDeliveryConfiguration(configurationInput:$configurationInput){
    _id
    delivery_charges
  }
}`
export const saveCurrencyConfiguration = `mutation SaveCurrencyConfiguration($configurationInput:CurrencyConfigurationInput!){
  saveCurrencyConfiguration(configurationInput:$configurationInput){
    _id
    currency
    currency_symbol
  }
}`

export const adminLogin = `mutation AdminLogin($email:String!,$password:String!){
  adminLogin(email:$email,password:$password){
    userId
    token
    name
    email
  }
}`

export const login = `
mutation Login($email:String,$password:String,$type:String!){
    login(email:$email,password:$password,type:$type){
     userId
     token
     tokenExpiration
     name
     email
     phone
     picture
   }
}
`

export const updateOrderStatus = `mutation UpdateOrderStatus($id:String!,$status:String!){
  updateOrderStatus(id:$id,status:$status){
    _id
    order_status
  }
}
`
export const updateStatus = `mutation UpdateStatus($id:String!,$status:Boolean!,$reason:String){
  updateStatus(id:$id,status:$status,reason:$reason){
    _id
    status
    reason
  }
}
`

export const uploadToken = `mutation UploadToken($pushToken:String!){
  uploadToken(pushToken:$pushToken){
    _id
    push_token
  }
}`

export const getUsers = `query{
  users{
    _id
    company_name
    business_name
    is_gst
    bank_account_name
    bank_account_number
    bsb_number
    abn_acn_number
    is_shop_keeper
    zip
    state
    city
    name
    email
    phone
    addresses{
      _id
      latitude
      longitude
      delivery_address
      details
      label
    }
    location{
      longitude
      latitude
      delivery_address
    }
	city
	state
	zip
	is_shop_keeper
	business_name
	company_name
	is_gst
	bank_account_name
	bank_account_number
	bsb_number
	abn_acn_number
  }
}`


export const resetPassword = `mutation ResetPassword($password:String!,$token:String!){
  resetPassword(password:$password,token:$token){
    result
  }
}`
    export const editUser = `
    mutation UpdateUser($name:String!,$phone:String!){
        updateUser(updateUserInput:{name:$name,phone:$phone}){
          _id
          name
          phone
        }
      }`
      export const createUser = `
  mutation CreateUser($facebookId:String,$phone:String,$email:String,$password:String,$name:String,$last_name:String,$picture:String,$notificationToken:String,$appleId:String){
      createUser(userInput:{
          facebookId:$facebookId,
          phone:$phone,
          email:$email,
          password:$password,
          name:$name,
          last_name:$last_name,
          picture:$picture,
          notificationToken:$notificationToken,
          appleId:$appleId
      }){
          userId
          token
          tokenExpiration
          name
          email
          phone
          picture
          notificationToken
          location{
            longitude
            latitude
            delivery_address
          }
      }
    }`

      export const createRider = `
mutation CreateRider($riderInput:RiderInput!){
    createRider(
        riderInput:$riderInput
    ){
    _id
    name
    username
    password
    phone
    image
    available
    }
  }`

export const getRiders = `query{
  riders{
    _id
    name
    username
    password
    phone
    image
    available
  }
}`

export const getAvailableRiders = `query{
  availableRiders{
    _id
    name
    username
    phone
    image
    available
  }
}`

export const editRider = `
    mutation EditRider($riderInput:RiderInput!){
        editRider(
          riderInput:$riderInput
        ){
          _id
          name
          username
          phone
          image
        }
      }`
export const deleteRider = `
      mutation DeleteRider($id:String!){
        deleteRider(id:$id){
          _id
        }
      }`

export const toggleAvailablity = `
      mutation ToggleRider($id:String){
        toggleAvailablity(id:$id){
          _id
        }
}`

export const pageCount = `
query{
  pageCount
}
`

export const assignRider = ` mutation AssignRider($id:String!,$riderId:String!){
  assignRider(id:$id,riderId:$riderId){
    _id
    rider{
      _id
      name
    }
  }
}`

export const getOrderStatuses = `query{
  getOrderStatuses
}
`

export const getPaymentStatuses = `query{
  getPaymentStatuses
}`

export const updatePaymentStatus = `mutation UpdatePaymentStatus($id:String!,$status:String!){
  updatePaymentStatus(id:$id,status:$status){
    _id
    payment_status
    paid_amount
  }
}
`

export const createOptions = `mutation CreateOptions($optionInput:[OptionInput]){
  createOptions(optionInput:$optionInput){
    _id
    title
    description
    price
  }
}`

export const getOptions = `query Options{
  options {
    _id
    title
    description
    price
  }
}
`

export const createAddons = `mutation CreateAddons($addonInput:[AddonInput]){
  createAddons(addonInput:$addonInput){
    _id
    title
    description
    options{
      _id
      title
      description
      price
    }
    quantity_minimum
    quantity_maximum
  }
}`
export const editAddon = `mutation editAddon($addonInput:AddonInput){
  editAddon(addonInput:$addonInput){
    _id
    title
    description
    options{
      _id
      title
      description
      price
    }
    quantity_minimum
    quantity_maximum
  }
}`

export const getAddons = `query Addons{
  addons{
  _id
  title
  description
  options{
    _id
    title
    description
    price
  }
  quantity_minimum
  quantity_maximum
}}`

export const deleteAddon = `
      mutation DeleteAddon($id:String!){
        deleteAddon(id:$id)
      }`

export const deleteOption = `
      mutation DeleteOption($id:String!){
        deleteOption(id:$id)
      }`
export const editOption = `mutation editOption($optionInput:OptionInput){
  editOption(optionInput:$optionInput){
          _id
          title
          description
          price
        }
      }`

export const createCoupon = `mutation CreateCoupon($couponInput:CouponInput!){
  createCoupon(couponInput:$couponInput){
    _id
    code
    discount
    enabled
  }
}`
export const editCoupon = `mutation editCoupon($couponInput:CouponInput!){
  editCoupon(couponInput:$couponInput){
    _id
    code
    discount
    enabled
        }
      }`
export const deleteCoupon = `mutation DeleteCoupon($id:String!){
        deleteCoupon(id:$id)
      }`


export const getCoupons = `query Coupons{
        coupons {
          _id
          code
          discount
          enabled
        }
      }`