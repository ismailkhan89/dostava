export const foodItem = `fragment foodItem on Food{
    _id
    img_url
    title
    description
    stock
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
    likes
    liked
    category{
        _id
    }
}`

export const getCartItems = `query GetCartItems {
    cartItems @client
  }`


export const orderItem = `fragment orderItem on Order{
    _id
    order_id
    delivery_address{
      latitude
      longitude
      delivery_address
      details
      label
    }
    delivery_charges
    items {
      _id
      food {
        _id
        title
      }
      variation{
        _id
        title
        price
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
          description
          price
        }
      }
      quantity
    }
    user {
      _id
      phone
    }
    payment_status
    payment_method
    paid_amount
    order_amount
    status_queue{
      pending
      preparing
      picked
      delivered
      cancelled
    }
    createdAt
}`

export const getNotifications = `query GetNotifications{
  notifications{
  _id
  order
  status
  __typename
  }
}`

export const isLoggedIn = `
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;