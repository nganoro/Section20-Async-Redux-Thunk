import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notifications';
import { sendCartData, fetchCartData } from './store/cart-actions';

//initialized only when it first renders
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData);
  }, [dispatch]);

  useEffect(() => {
    
      /** the following is if you're using thunk */

      if (isInitial){
        isInitial = false;
        return;
      }

      if(cart.changed){
        dispatch(sendCartData(cart));
      }

/** you can use this or the thunk above */
    //   const sendCartData = async () => {
    //     dispatch(
    //       uiActions.showNotification({
    //         status: 'pending',
    //         title: 'Sending...',
    //         message: 'Sending cart data!'
    //     })
    //   );
    //   const response = await fetch
    //     ('https://react-http-6b4a6.firebaseio.com/cart.json',
    //     {
    //       method: 'PUT',
    //       body: JSON.stringify(cart),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error('Sending cart data failed.');
    //   }

    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sent cart data successfully!'
    //     })
    //   );
    // };

    //   if (isInitial){
    //     isInitial = false;
    //     return;
    //   }

    //   sendCartData().catch((error) => {
    //     dispatch(
    //       uiActions.showNotification({
    //           status: 'error',
    //           title: 'Error!',
    //           message: 'Sending cart data failed!',
    //       })
    //     );
    //   });


      }, [cart, dispatch]);
  
  
  return (
    <>
      {notification && (
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}/>
        )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
