import React from "react";
import {useForm} from 'react-hook-form';
import DatePickerPermission from "./DatePickerPermission";

import SelectPermissionType from "./SelectPermissionType";

const AddPermissionForm = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm();
    
    
    const onSubmit=(data, e)=>{
        // if(!data.employeeName || !data.employeeLastName) return
        data.permissionTypeId=props.selectedTypePermission;
        data.permissionDate=props.selectedPermissionDate;
        props.addPermission(data);
        e.target.reset();
    }  


    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Employee Name</label>
            <input type='text' name='employeeName' {...register('employeeName', {required: true})}
            ></input>
            {errors.employeeName && <p>Campo requerido</p>}
            
            <label>Employee Last Name</label>
            <input type='text' name='employeeLastName' {...register('employeeLastName', {required: true})}></input>
            {errors.employeeLastName && <p>Campo requerido</p>}

            <label>Permission Type</label>
            {/* <input type='text' name='permissionType' {...register('permissionType', {required: true})}></input>
            {errors.permissionType && <p>Campo requerido</p>} */}
            <SelectPermissionType tipo={props.tipo} selectedTypePermission={props.selectedTypePermission} getSelectedPermissionType={props.getSelectedPermissionType}></SelectPermissionType>
            <label>Permission Date</label>
            {/* <input type='text' name='permissionDate' {...register('permissionDate', {required: true})}></input>
            {errors.permissionDate && <p>Campo requerido</p>} */}
            <DatePickerPermission selectedPermissionDate={props.selectedPermissionDate} getPermissionDate={props.getPermissionDate}></DatePickerPermission>
            
            <button>Add new Permission</button>
        </form>
     );
}
 
export default AddPermissionForm;