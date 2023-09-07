import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { sendCartData } from './store/cart-slice';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    
      /** action thunk in cart slice */

      //dispatch(sendCartData(cart));

      const sendCartData = async () => {
        const response = await fetch('https://react-http-6b4a6.firebaseio.com/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cart),
        });

        if (!response.ok) {
          throw new Error
        }
      };
      
      }, [cart]);
  
  
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
