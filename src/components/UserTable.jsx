import React, { useState, useEffect } from 'react';

const UserTable = ({ addToCart, cart, removeFromCart, incrementInCart }) => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrugs, setFilteredDrugs] = useState([]);

  // قراءة الأدوية من الـ Local Storage عند تحميل الصفحة
  useEffect(() => {
    const savedDrugs = JSON.parse(localStorage.getItem('drugs')) || [];
    setDrugs(savedDrugs);
    setFilteredDrugs(savedDrugs); // تعيين الأدوية في البداية لعرضها في الجدول
  }, []);

  // تصفية الأدوية بناءً على الاسم التجاري
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDrugs(drugs);
    } else {
      const searchTermLowerCase = searchTerm.toLowerCase();
      // تصفية الأدوية بناءً على الاسم التجاري
      const matchedDrugsByName = drugs.filter(drug =>
        drug.name.toLowerCase().includes(searchTermLowerCase)
      );

      // الحصول على التركيب العلمي للأدوية المطابقة
      const matchedComposition = new Set(
        matchedDrugsByName.map(drug => drug.composition.toLowerCase())
      );
      
      // تصفية الأدوية بناءً على التركيب العلمي
      const matchedDrugsByComposition = drugs.filter(drug =>
        matchedComposition.has(drug.composition.toLowerCase())
      );
      
      setFilteredDrugs(matchedDrugsByComposition);
    }
  }, [searchTerm, drugs]);

  
  const isInCart = (id) => {
    return cart.find(item => item.id === id);
  };

  return (
    <div className="user-table">
      <h1>بحث عن الأدوية</h1>
      <input
        type="text"
        placeholder="ابحث عن دواء بالاسم التجاري..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <table>
        <thead>
          <tr>
            <th>الاسم التجاري</th>
            <th>التركيب العلمي</th>
            <th>السعر</th>
            <th>تاريخ الصلاحية</th>
            <th>الرف</th>
            <th>اسم الشركة</th>
            <th>الكمية</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrugs.map((drug) => {
            const itemInCart = isInCart(drug.id);
            return (
              <tr key={drug.id}>
                <td>{drug.name}</td>
                <td>{drug.composition}</td>
                <td>  ل.س  {drug.price}</td>
                <td>{drug.expiryDate}</td>
                <td>{drug.shelf}</td>
                <td>{drug.company}</td>
                <td>
                  {itemInCart ? (
                    <div className="quantity-controls">
                      <button onClick={() => incrementInCart(drug.id)}>+</button>
                      <span>{itemInCart.quantity}</span>
                      <button onClick={() => removeFromCart(drug.id)}>-</button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(drug)}>إضافة إلى السلة</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
