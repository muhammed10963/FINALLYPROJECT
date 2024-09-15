import React, { useState, useEffect } from 'react';

const DrugForm = ({ onAddDrug, editingDrug, onEditDrug }) => {
  const [drug, setDrug] = useState({
    id: '',
    name: '',
    composition: '',
    price: '',
    expiryDate: '',
    shelf: '',
    company: ''
  });

  // أسماء الشركات المخزنة مسبقًا
  const companies = [
    { id: 1, name: 'شركة الدواء العربية' },
    { id: 2, name: 'شركة الشفاء الطبي' },
    { id: 3, name: 'شركة الرعاية الصحية' }
  ];

  useEffect(() => {
    if (editingDrug) {
      setDrug(editingDrug);
    } else {
      setDrug({
        id: Date.now(),
        name: '',
        composition: '',
        price: '',
        expiryDate: '',
        shelf: '',
        company: ''
      });
    }
  }, [editingDrug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrug((prevDrug) => ({
      ...prevDrug,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDrug) {
      onEditDrug(drug);
    } else {
      onAddDrug(drug);
    }
    setDrug({});
  };

  return (
    <div className="drug-form">
      <h2>{editingDrug ? 'تعديل الدواء' : 'إضافة دواء جديد'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="الاسم التجاري"
          value={drug.name || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="composition"
          placeholder="التركيب العلمي"
          value={drug.composition || ''}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={drug.price || ''}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expiryDate"
          placeholder="تاريخ الصلاحية"
          value={drug.expiryDate || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="shelf"
          placeholder="الرف"
          value={drug.shelf || ''}
          onChange={handleChange}
          required
        />
    
        <select
          name="company"
          value={drug.company || ''}
          onChange={handleChange}
          required
          className="dropdown-select"
        >
          <option value="">اختر الشركة</option>
          {companies.map((company) => (
            <option key={company.id} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
        <button type="submit">
          {editingDrug ? 'تحديث الدواء' : 'إضافة الدواء'}
        </button>
      </form>
    </div>
  );
};

export default DrugForm;
