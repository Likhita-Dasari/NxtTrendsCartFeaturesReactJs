// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const length1 = cartList.length
      let totalAmount = 0
      cartList.map(each => {
        const {quantity, price} = each
        totalAmount += quantity * price
        return null
      })

      return (
        <div>
          <h1>Order Total: Rs {totalAmount}/-</h1>
          <p>{length1} items in cart</p>
          <button>Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
