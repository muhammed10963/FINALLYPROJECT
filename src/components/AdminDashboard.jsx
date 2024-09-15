import React, { useState, useEffect } from 'react';
import DrugForm from './DrugForm';
import DrugTable from './DrugTable';
import EditDrugPopup from './EditDrugPopup';
import UserForm from './UserForm';
import UsersTable from './UsersTable';
import EditUserPopup from './EditUserPopup';

const AdminDashboard = () => {
  const [drugs, setDrugs] = useState([]);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]); // حالة لتخزين أسماء الشركات
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDrugForm, setShowAddDrugForm] = useState(false);
  const [editingDrug, setEditingDrug] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserPopup, setShowEditUserPopup] = useState(false);

  useEffect(() => {
    const savedDrugs = JSON.parse(localStorage.getItem('drugs')) || [];
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const savedCompanies = JSON.parse(localStorage.getItem('companies')) || []; // استرجاع الشركات من اللوكال ستورج

    setDrugs(savedDrugs);
    setUsers(savedUsers);
    setCompanies(savedCompanies);

    // إضافة شركات افتراضية إلى اللوكال ستورج إذا لم تكن موجودة
    if (savedCompanies.length === 0) {
      const initialCompanies = [
        { id: 1, name: 'شركة الأدوية العربية' },
        { id: 2, name: 'شركة الصحة العالمية' },
        { id: 3, name: 'شركة الشفاء' },
      ];
      localStorage.setItem('companies', JSON.stringify(initialCompanies));
      setCompanies(initialCompanies);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('drugs', JSON.stringify(drugs));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('companies', JSON.stringify(companies)); // تحديث الشركات في اللوكال ستورج
  }, [drugs, users, companies]);

  const handleAddDrug = (newDrug) => {
    setDrugs((prevDrugs) => [...prevDrugs, newDrug]);
  };

  const handleDeleteDrug = (id) => {
    let ensur = window.confirm(' هل أنت متأكد من عملية الحذف ؟ ');
    if(ensur){
    setDrugs((prevDrugs) => prevDrugs.filter((drug) => drug.id !== id));}
  };

  const handleEditDrug = (updatedDrug) => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) => (drug.id === updatedDrug.id ? updatedDrug : drug))
    );
    setEditingDrug(null);
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleDeleteUser = (username) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.username === editingUser.username ? updatedUser : user))
    );
    setEditingUser(null);
    setShowEditUserPopup(false);
  };

  const filteredDrugs = drugs.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      {/* قسم إدارة الأدوية */}
      <div className="admin-section">
        <div className="admin-header">
          <h1>إدارة الأدوية</h1>
          <button onClick={() => setShowAddDrugForm(!showAddDrugForm)}>
            {showAddDrugForm ? 'إغلاق نموذج إضافة الدواء' : 'إضافة دواء جديد'}
          </button>
        </div>
        {showAddDrugForm && (
          <DrugForm
            onAddDrug={handleAddDrug}
            editingDrug={editingDrug}
            onEditDrug={handleEditDrug}
          />
        )}
        <input
          type="text"
          placeholder="ابحث عن دواء بالاسم التجاري..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <DrugTable
          drugs={filteredDrugs}
          onDeleteDrug={handleDeleteDrug}
          onEditDrug={(drug) => setEditingDrug(drug)}
        />
        {editingDrug && (
          <EditDrugPopup
            drug={editingDrug}
            onClose={() => setEditingDrug(null)}
            onSave={handleEditDrug}
            companyNames={companies} // تمرير أسماء الشركات إلى البوب أب
          />
        )}
      </div>
      {/* قسم إدارة المستخدمين */}
      <div className="admin-section">
        <div className="admin-header">
          <h1>إدارة المستخدمين</h1>
          <button onClick={() => {
            setEditingUser(null);
            setShowAddUserForm(!showAddUserForm);
          }}>
            {showAddUserForm ? 'إغلاق نموذج إضافة المستخدم' : 'إضافة مستخدم جديد'}
          </button>
        </div>
        {showAddUserForm && (
          <UserForm
            onAddUser={handleAddUser}
            userToEdit={editingUser}
            onEditUser={handleEditUser}
          />
        )}
        <UsersTable
          users={users}
          onEditUser={(user) => {
            setEditingUser(user);
            setShowEditUserPopup(true);
          }}
          onDeleteUser={handleDeleteUser}
        />
        {showEditUserPopup && editingUser && (
          <EditUserPopup
            user={editingUser}
            onClose={() => setShowEditUserPopup(false)}
            onSave={handleEditUser}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
