import React, { useState, useEffect } from 'react';

const EditDrugPopup = ({ drug, onClose, onSave, companyNames }) => {
  const [editedDrug, setEditedDrug] = useState({
    id: '',
    name: '',
    composition: '',
    price: '',
    expiryDate: '',
    shelf: '',
    company: ''
  });

  useEffect(() => {
    if (drug) {
      setEditedDrug(drug);
    }
  }, [drug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDrug((prevDrug) => ({
      ...prevDrug,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedDrug);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>تعديل الدواء</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="الاسم التجاري"
            value={editedDrug.name || ''}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="composition"
            placeholder="التركيب العلمي"
            value={editedDrug.composition || ''}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="السعر"
            value={editedDrug.price || ''}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="expiryDate"
            placeholder="تاريخ الصلاحية"
            value={editedDrug.expiryDate || ''}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="shelf"
            placeholder="الرف"
            value={editedDrug.shelf || ''}
            onChange={handleChange}
            required
          />

          {/* القائمة المنسدلة الخاصة بالشركات مع فئة مخصصة */}
          <select
            name="company"
            className="dropdown-company"
            value={editedDrug.company || ''}
            onChange={handleChange}
            required
          >
            <option value="">اختر اسم الشركة</option>
            {companyNames.map((company) => (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>

          <div className="popup-buttons">
            <button type="submit">موافق</button>
            <button type="button" onClick={onClose}>إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDrugPopup;
