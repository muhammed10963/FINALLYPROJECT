import React from 'react';

const UsersTable = ({ users, onEditUser, onDeleteUser }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>الاسم</th>
          <th>كلمة السر</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>
              <button onClick={() => onEditUser(user)}>تعديل</button>
              <button onClick={() => onDeleteUser(user.username)}>حذف</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
