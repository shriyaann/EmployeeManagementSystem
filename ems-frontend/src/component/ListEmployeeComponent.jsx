import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployee } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    //using useState hook
    const [employees, setEmployee]= useState([]) // has two variables state- employees and function that updates state variable -  setEmployees
    const navigator = useNavigate();
    
    useEffect(()=>{
        getAllEmployees();
    },[])


    function getAllEmployees(){
        listEmployee().then((response) =>{
            setEmployee(response.data);
        }).catch(error=>{
        console.error(error);
        })
    }
    //Add New Employee
    function addNewEmployee(){
        navigator('/add-employee')
    }

    //Update employee
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`) //backtick symbol below esc 
    }

    //delete employee
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then(response => {
            getAllEmployees();
        }).catch(error=>{
            console.error(error);
            })
    }
    return (
        <div className="container mt-3">
            <h2 className='text-center'>List of Employees</h2>
            <table className="table table-dark table-striped table-hover">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //iterate over an employees array and display each data in row ( employees from line 6)
                        employees.map(employee => 
                            <tr key={employee.id}> 
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>  
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button>
                                </td>                                                 
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                <button className="btn btn-dark" onClick={addNewEmployee}>Add Employee</button>
            </div>
        </div>
    )
}

export default ListEmployeeComponent
