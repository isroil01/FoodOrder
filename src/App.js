import {  useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvide from './store/CartProvide';

function App() {

  const [cartIsShown,setCartIsShown] = useState(false);

  const openHandeler = () =>{
    setCartIsShown(true);
  }

  const closeHandeler = () =>{
    setCartIsShown(false);
  }

  return (
    <CartProvide>
      {cartIsShown &&<Cart onClose={closeHandeler} />}
       <Header onShow={openHandeler} />
       <main>
         <Meals />
       </main>
    </CartProvide>
  );
}

export default App;
