import React, { useState, useEffect } from 'react';

const UserForm = ({ onAddUser, userToEdit, onEditUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // حقل تأكيد كلمة السر
  const [error, setError] = useState(''); // حالة لتخزين رسالة الخطأ

  useEffect(() => {
    if (userToEdit) {
      setUsername(userToEdit.username);
      setPassword(userToEdit.password);
      setConfirmPassword(userToEdit.password); // تعيين كلمة المرور المؤكدة عند التعديل
    } else {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    }
    setError(''); // إعادة تعيين الخطأ
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('كلمتا السر غير متطابقتين');
      return;
    }

    const user = { username, password };

    if (userToEdit) {
      // تحديث المستخدم
      onEditUser(user);
    } else {
      // إضافة مستخدم جديد
      onAddUser(user);
    }

    // إعادة تعيين الحقول بعد الإضافة أو التحديث
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{userToEdit ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label>الاسم:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>كلمة السر:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>تأكيد كلمة السر:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        {userToEdit ? 'تحديث' : 'إضافة'}
      </button>
    </form>
  );
};

export default UserForm;
