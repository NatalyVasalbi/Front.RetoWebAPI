import React from "react";

const PermissionTable = (props) => (
    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee Last Name</th>
          <th>Permission Type</th>
          <th>Permission Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.permissions.length > 0 ? (
          props.permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.employeeName}</td>
              <td>{permission.employeeLastName}</td>
              <td>{permission.permissionType.description}</td>
              <td>{new Date(permission.permissionDate).toLocaleDateString('es-ES')}</td>              
              <td>
                <button className="button muted-button" onClick={()=>{props.editRow(permission)}}>Edit</button>
                <button className="button muted-button" onClick={()=>{props.deletePermission(permission.id)}}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          // <tr>
          //   <td colSpan={5}>No permissions</td>
          // </tr>
          <h1>No permissions</h1>
        )}
      </tbody>
    </table>
  )

export default PermissionTable;
