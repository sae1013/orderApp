import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
// 컴포넌트 임포트
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () =>{
    setCartIsShown(true);
  };
  const hideCartHandler = ()=>{
    
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart = {showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
    
  );
}

export default App;
