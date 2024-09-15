import React, { useState } from 'react';

const EditUserPopup = ({ user, onClose, onSave }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, username, password });
  };

  return (
    <div className="edit-user-popup">
      <div className="popup-content">
        <h2>تعديل مستخدم</h2>
        <form onSubmit={handleSubmit}>
          <label>
            الاسم:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            كلمة السر:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="popup-actions">
            <button type="submit">تم</button>
            <button type="button" onClick={onClose}>إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserPopup;
