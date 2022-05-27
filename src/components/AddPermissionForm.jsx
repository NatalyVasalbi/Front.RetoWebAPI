import React, {useState, useEffect} from "react";
import {useForm} from 'react-hook-form';
import  axios  from "axios";

const AddPermissionForm = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [selectedTypePermission, setSelectedTypePermission]=useState(0)

    const onSubmit=(data, e)=>{
        // if(!data.employeeName || !data.employeeLastName) return
        data.permissionType=selectedTypePermission;
        props.addPermission(data);
        e.target.reset();
    }

    const [tipo, setTipo] = useState([{id:1, title: 'admin'},{id:2, title: 'usertest'}]);

    useEffect(() => {
        peticionGetTypes()
      }, []);

      const peticionGetTypes= async()=>{
          const urlTypes="https://api.mercadolibre.com/sites/MLA/search?q=polo";
          await axios
          .get(urlTypes)
          .then((response)=>{
              console.log(response.data.results);
              setTipo(response.data.results);
            //   console.log(tipo)
          });
      };


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
            <select name="permissionType" className="form-control"
            defaultValue={selectedTypePermission}
            onChange={(e)=>setSelectedTypePermission(e.target.value)}>
                {tipo.map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>{elemento.title}</option>
                ))}
            </select>

            <label>Permission Date</label>
            <input type='text' name='permissionDate' {...register('permissionDate', {required: true})}></input>
            {errors.permissionDate && <p>Campo requerido</p>}
            
            <button>Add new Permission</button>
        </form>
     );
}
 
export default AddPermissionForm;