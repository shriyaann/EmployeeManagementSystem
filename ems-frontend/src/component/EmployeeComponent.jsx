import {React, useEffect, useState} from 'react'
import {createEmployee, getEmployee, updateEmployee} from '../service/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom' //to redirect to another page

const EmployeeComponent = () => {
    //define state variables using useState hook
    const [firstName, setFirstName]= useState('')
    const [lastName, setLastName]= useState('')
    const [email, setEmail]= useState('')
    const {id} = useParams();

    //to redirect page
    const navigator = useNavigate();

   
     //form error handling
     const [errors, setErrors] =useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    function validateForm(){
        let valid = true;
        const errorsCopy = {...errors}
        if(firstName.trim()){
            errorsCopy.firstName='';
        }else{
            errorsCopy.firstName='First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName='';
        }else{
            errorsCopy.lastName='Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email='Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    //page title based on employee id
    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Employee</h2>
        }else{
            return <h2 className="text-center">Add Employee</h2>

        }
    }

     //auto populate the update employee's data in edit employee
     useEffect(() => {
        if(id){
            getEmployee(id).then((response) =>{
               setFirstName(response.data.firstName);
               setLastName(response.data.lastName);
               setEmail(response.data.email); 
            }).catch(error => {
                console.error(error);
            })

        }
    },[id])

     //to save data to form
     function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {firstName, lastName, email}
            console.log(employee)
            
            //update employee
            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else{           

            //Add employee
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    //navigate to /employees on submit
                    navigator('/employees')
                }).catch(error =>{
                    console.error(error);
                })
            }
        }    
    }    


    return (
        <div className="container">
            <br></br><br></br>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }                        
                    <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">First Name:</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${ errors.firstName ? 'is-invalid': ''}`}                                      
                                        id="fname" 
                                        placeholder="Enter Employee First Name" 
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}/>
                                    {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name:</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${ errors.lastName ? 'is-invalid': ''}`}                                      
                                        id="lname" 
                                        placeholder="Enter Employee Last Name" 
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}/>
                                    {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
                                </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Email:</label>
                                <input 
                                    type="email" 
                                    className={`form-control ${ errors.email ? 'is-invalid': ''}`}                                      
                                    id="email" 
                                    placeholder="Enter employee email" 
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                                {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                            </div>
                            <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent