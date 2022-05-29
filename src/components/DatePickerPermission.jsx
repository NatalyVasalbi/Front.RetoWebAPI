import React from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'

registerLocale("es", es)


const DatePickerPermission = (props) => {
    
    return (
            <DatePicker 
        selected={new Date(props.selectedPermissionDate)}         
        onChange={date => props.getPermissionDate(date)}
        locale="es"
        dateFormat='dd/MM/yyyy'
        minDate={new Date()}
        filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
        isClearable
        showYearDropdown
        scrollableMonthYearDropdown
        ></DatePicker>
        
    );
}
 
export default DatePickerPermission;