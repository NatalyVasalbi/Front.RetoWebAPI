import React from "react";
import {useForm} from 'react-hook-form';
import DatePickerPermission from "./DatePickerPermission";
import SelectPermissionType from "./SelectPermissionType";

const EditPermissionForm = (props) => {


    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        defaultValues: props.currentPermission
    });
    setValue('employeeName', props.currentPermission.employeeName);
    setValue('employeeLastName', props.currentPermission.employeeLastName)
    // setValue('permissionTypeId', props.currentPermission.permissionTypeId)
    // setValue('permissionDate', props.currentPermission.permissionDate)


    const onSubmit=(data, e)=>{
        // if(!data.employeeName || !data.employeeLastName) return
        data.id=props.currentPermission.id
        props.updatePermission(props.currentPermission.id, data)
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
            <SelectPermissionType tipo={props.tipo} selectedTypePermission={props.currentPermission.permissionTypeId} getSelectedPermissionType={props.getSelectedPermissionType}></SelectPermissionType>

            <label>Permission Date</label>
            {/* <input type='text' name='permissionDate' {...register('permissionDate', {required: true})}></input>
            {errors.permissionDate && <p>Campo requerido</p>} */}
            <DatePickerPermission selectedPermissionDate={props.currentPermission.permissionDate} getPermissionDate={props.getPermissionDate}></DatePickerPermission>
            
            <button>Edit Permission</button>
        </form>
     );
}
 
export default EditPermissionForm;