import React from 'react';

const DrugTable = ({ drugs, onDeleteDrug, onEditDrug }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>الاسم التجاري</th>
          <th>التركيب العلمي</th>
          <th>السعر</th>
          <th>تاريخ الصلاحية</th>
          <th>الرف</th>
          <th>اسم الشركة</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {drugs.map((drug) => (
          <tr key={drug.id}>
            <td>{drug.name}</td>
            <td>{drug.composition}</td>
            <td>{drug.price}</td>
            <td>{drug.expiryDate}</td>
            <td>{drug.shelf}</td>
            <td>{drug.company}</td>
            <td>
              <button onClick={() => onEditDrug(drug)}>تعديل</button>
              <button onClick={() => onDeleteDrug(drug.id)}>حذف</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DrugTable;
