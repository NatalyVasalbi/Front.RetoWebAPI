import React from "react";

const SelectPermissionType = (props) => {

    return (
        <select name="permissionType" className="form-control"
            defaultValue={props.selectedTypePermission}
            onChange={(e)=>props.getSelectedPermissionType(e.target.value)}>
                {props.tipo.map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>{elemento.title}</option>
                ))}
            </select>
    );
}
 
export default SelectPermissionType;