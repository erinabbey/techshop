import React, {useState, useEffect} from 'react'
// import Products from './component/Products/Products'
// import Navbar from './component/Navbar/Navbar'
import {commerce} from './lib/commerce'
import Checkout from './component/CheckoutForm/Checkout/Checkout'
import {Products,  Navbar, Cart} from './component'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fecthProducts = async() =>{
    const {data} = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async()=>{
    // const cart = await commerce.cart.retrieve()
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart  = async(productId, quantity) =>{
    const addtocart = await commerce.cart.add(productId, quantity)
    setCart(addtocart.cart)
  }

  // tăng giảm số lượng mỗi sản phẩm khi bấm vào +, -
  // sử dụng id là cố định, còn số lượng thay đổi nên dùng biến
  const handleUpdateCartQty = async(productId, quantity) =>{
    const response = await commerce.cart.update(productId, {quantity})

    setCart(response.cart)
  }
// 
  const handleRemove = async (productId)=>{
    const removeCart = await commerce.cart.remove(productId)
    setCart(removeCart.cart)
  }

  const handleEmptyCart = async()=>{
    const emptyCart = await commerce.cart.empty()
    setCart(emptyCart.cart)
  }

  const refreshCart = async() =>{
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async(checkoutTokenId, newOrder)=>{
    try{
      const imcomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(imcomingOrder)
      refreshCart()

    }catch(error){
      setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() =>{
    fecthProducts()
    fetchCart()
  }, [])

  return (
    <Router>
      <div>
        <Navbar totalItems = {cart.total_items}/>
          <Switch>
            <Route exact path = '/'>
              <Products products = {products} onAddToCart = {handleAddToCart} handleUpdateCartQty/>
            </Route>
            <Route exact path = '/cart'>
             <Cart cart = {cart} 
                    handleUpdateCartQty = {handleUpdateCartQty}
                    handleRemove = {handleRemove}
                    onEmptyCart = {handleEmptyCart}
             />
            </Route>
            <Route exact path = '/checkout'>  
                  <Checkout cart = {cart} 
                  order = {order}
                  onCaptureCheckout = {handleCaptureCheckout}
                  error = {errorMessage}
                  />
            </Route>
          </Switch>
      </div>
    </Router>
    
  )
}

export default App
