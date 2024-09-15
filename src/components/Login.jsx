import React, { useEffect, useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');

  const handleLogin = () => {
    onLogin({ username, password });
  };

  useEffect(()=>{
    const adminUser = {
      username: 'admin',
      password: 'admin', // أو كلمة مرور المدير الجديدة
      role: 'admin'
    };
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.role !== 'admin'); // حذف أي حسابات مدير قديمة إذا كانت موجودة
    users.push(adminUser);
    
    localStorage.setItem('users', JSON.stringify(users));
    
  },[])
  return (
    <div className="login-container">
      <h1>تسجيل الدخول</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="login-form">
        <label htmlFor="username">اسم المستخدم:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="أدخل اسم المستخدم"
        />
        <label htmlFor="password">كلمة السر:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="أدخل كلمة السر"
        />
        <button onClick={handleLogin}>تسجيل الدخول</button>
      </div>
    </div>
  );
};

export default Login;


///////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       // إرسال طلب تسجيل الدخول إلى الباك إند
//       const response = await fetch('http://your-backend-api-url/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         // عرض رسالة خطأ عند حدوث مشكلة في تسجيل الدخول
//         const errorData = await response.json();
//         setError(errorData.message || 'فشل تسجيل الدخول');
//         return;
//       }

//       // قراءة البيانات من الاستجابة
//       const data = await response.json();
//       const { token, user } = data;

//       // تخزين التوكن في localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('currentUser', JSON.stringify(user));

//       // استدعاء onLogin مع بيانات المستخدم
//       onLogin(user);

//       // مسح رسالة الخطأ عند تسجيل الدخول بنجاح
//       setError('');
//     } catch (err) {
//       // التعامل مع الأخطاء التي قد تحدث أثناء إرسال الطلب
//       setError('حدث خطأ أثناء محاولة تسجيل الدخول');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>تسجيل الدخول</h1>
//       {error && <p className="error-message">{error}</p>}
//       <div className="login-form">
//         <label htmlFor="username">اسم المستخدم:</label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="أدخل اسم المستخدم"
//           required
//         />
//         <label htmlFor="password">كلمة السر:</label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="أدخل كلمة السر"
//           required
//         />
//         <button onClick={handleLogin}>تسجيل الدخول</button>
//       </div>
//     </div>
//   );
// };

// export default Login;



















