import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id !== id)
    this.setState({cartList: [...filteredList]})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(each => {
      if (each.id === id) {
        //  const {quantity} = each
        //  each.quantity = quantity + 1
        return {
          ...each,
          quantity: Math.max(each.quantity + 1, 0),
        }
      }
      return each
    })
    this.setState({cartList: [...updatedList]})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(each => {
      if (each.id === id) {
        //  const {quantity} = each
        //  each.quantity = quantity - 1
        return {
          ...each,
          quantity: Math.max(each.quantity - 1, 0),
        }
      }
      return each
    })
    this.setState({cartList: [...updatedList]})
  }

  addCartItem = product => {
    const {cartList} = this.state
    let isProductPresent = false
    cartList.map(each => {
      if (each.id === product.id) {
        isProductPresent = true
      }
      return null
    })
    if (!isProductPresent) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.incrementCartItemQuantity(product.id)
    }

    // TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
