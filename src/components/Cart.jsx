import React from 'react';

const Cart = ({ cart, removeFromCart, completePurchase }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>سلة المشتريات</h2>
      {cart.length === 0 ? (
        <p>سلتك فارغة</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>الاسم التجاري</th>
                <th>الكمية</th>
                <th>السعر</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>  ل.س {item.price}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <p>   السعر الإجمالي : ل.س {getTotalPrice()}</p>
            <button onClick={completePurchase}>تم</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
