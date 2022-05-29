import logo from "./logo_n5.png";
import "./App.css";
import React, { useState, useEffect } from "react";
import PermissionTable from "./components/PermissionTable";
import { v4 as uuidv4 } from "uuid";
import AddPermissionForm from "./components/AddPermissionForm";
import EditPermissionForm from "./components/EditPermissionsForm";
import  axios  from "axios";

function App() {  
  const permissionsData = [
    {
      id: uuidv4(),
      employeeName: "Tania",
      employeeLastName: "floppydiskette",
      permissionType: "5",
      permissionDate: "Marzo",
    },
    {
      id: uuidv4(),
      employeeName: "Craig",
      employeeLastName: "siliconeidolon",
      permissionType: "5",
      permissionDate: "Marzo",
    },
    {
      id: uuidv4(),
      employeeName: "Ben",
      employeeLastName: "benisphere",
      permissionType: "5",
      permissionDate: "Marzo",
    },
  ];

  //state
  const [permissions, setPermissions] = useState([]);

  // Agregar permission
  const addPermission = (permission) => {
    // permission.id = uuidv4();
    // setPermissions([...permissions, permission]);
    const data={
      employeeName: permission.employeeName,
      employeeLastName: permission.employeeLastName,
      permissionTypeId: permission.permissionTypeId,
      permissionDate: permission.permissionDate
    };
    axios.post('http://localhost:5000/Permissions', data)
    .then(response=>{console.log("Status: ", response.status);})
    .catch(error=>{console.error('Something went wrong!', error);})
  };

  // Eliminar permission
  const deletePermission = (id) => {
    // setPermissions(permissions.filter((permission) => permission.id !== id));
    axios.delete(`http://localhost:5000/Permissions/${id}`)
    .then(()=>console.log('Delete sucessful'))
  };

  // Editar permissions
  const [editing, setEditing] = useState(false);
  const [currentPermission, setCurrentPermission] = useState({
    id: null,
    employeeName: "",
    employeeLastName: "",
    permissionType: "",
    permissionDate: "",
  });

  const editRow = (p) => {
    setEditing(true);
    setCurrentPermission({
      id: p.id,
      employeeName: p.employeeName,
      employeeLastName: p.employeeLastName,
      permissionTypeId: p.permissionTypeId,
      permissionDate: p.permissionDate      
    });
    console.log("FECHA CURRENT: "+p.permissionDate)
  };

  // Actualizar permissions
  const updatePermission = (id, updatePermission) => {
    setEditing(false);
    // setPermissions(
    //   permissions.map((permission) =>
    //     permission.id === id ? updatePermission : permission
    //   )
    // );
    const data={
      id: id,
      employeeName: updatePermission.employeeName,
      employeeLastName: updatePermission.employeeLastName,
      permissionTypeId: updatePermission.permissionTypeId,
      permissionDate: updatePermission.permissionDate
    };
    axios.put('http://localhost:5000/Permissions', data)
    .then(response=>{console.log("Status: ", response.status);})
    .catch(error=>{console.error('Something went wrong!', error);})
  };


  useEffect(() => {
    getPermissions()
    peticionGetTypes()
  }, [permissions]);

  const [tipo, setTipo] = useState([]);

  const peticionGetTypes= async()=>{
      const urlTypes="http://localhost:5000/PermissionTypes";
      await axios
      .get(urlTypes)
      .then((response)=>{
          setTipo(response.data);
      });
  };
  const getPermissions= async()=>{
      const urlTypes="http://localhost:5000/Permissions";
      await axios
      .get(urlTypes)
      .then((response)=>{
          setPermissions(response.data);
      });
  };

  const [selectedTypePermission, setSelectedTypePermission]=useState(1)
  const getSelectedPermissionType=(value)=>{
    setSelectedTypePermission(value);
  }


  const [selectedPermissionDate, setSelectedPermissionDate]=useState(new Date())

  const getPermissionDate=(date)=>{
    setSelectedPermissionDate(date);
  }
  


  return (
    <div className="App">
      <div className="container">
        {/* <img src={logo} alt="logo" /> */}
        <h1>CRUD APP WITH REACT HOOKS</h1>
        <div className="flex-row">
          <div className="flex-large">
            {editing ? (
              <div className="flex-large">
                <h2>EDIT PERMISSION</h2>
                <EditPermissionForm
                  currentPermission={currentPermission}
                  updatePermission={updatePermission}
                  getSelectedPermissionType={getSelectedPermissionType}
                  selectedTypePermission={selectedTypePermission}
                  tipo={tipo}
                ></EditPermissionForm>
              </div>
            ) : (
              <div className="flex-large">
                <h2>ADD PERMISSIONS</h2>
                <AddPermissionForm
                  addPermission={addPermission}
                  getSelectedPermissionType={getSelectedPermissionType}
                  selectedTypePermission={selectedTypePermission}
                  tipo={tipo}
                  selectedPermissionDate={selectedPermissionDate}
                  getPermissionDate={getPermissionDate}
                ></AddPermissionForm>
              </div>
            )}
          </div>
          <div className="flex-large">
            <h2>VIEW PERMISSION</h2>
            <PermissionTable
              permissions={permissions}
              deletePermission={deletePermission}
              editRow={editRow}
            ></PermissionTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
