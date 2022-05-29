import React from "react";

const SelectPermissionType = (props) => {

    return (
        <select className="form-control"
            defaultValue={props.selectedTypePermission}
            onChange={(e)=>props.getSelectedPermissionType(e.target.value)}>
                {props.tipo.map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>{elemento.description}</option>
                ))}
            </select>
    );
}
 
export default SelectPermissionType;