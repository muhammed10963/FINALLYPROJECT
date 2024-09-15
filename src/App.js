import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import UserTable from './components/UserTable';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [exit,setexit] = useState(true)
  const handleLogin = (userInfo) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(
      (user) => user.username === userInfo.username && user.password === userInfo.password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      alert('الاسم أو كلمة السر غير صحيحة');
    }
  };
  useEffect(()=>{},[exit])
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const item = prevCart.find((cartItem) => cartItem.id === id);
      if (item.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== id);
      }
    });
  };

  const incrementInCart = (id) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const completePurchase = () => {
    alert('تمت عملية الشراء بنجاح!');
    setCart([]); // Clear cart after purchase
  };

  return (
    <div>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <div>
          <button onClick={()=>window.confirm('are you sure to exit !')}>
          <h1>مرحبا  { user.username } ! </h1>
          </button>
          <UserTable 
            addToCart={addToCart} 
            cart={cart} 
            removeFromCart={removeFromCart} 
            incrementInCart={incrementInCart} 
          />
          <Cart cart={cart} removeFromCart={removeFromCart} completePurchase={completePurchase} />
        </div>
      )}
    </div>
  );
};

export default App;
