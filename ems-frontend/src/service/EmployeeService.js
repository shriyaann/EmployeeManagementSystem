import axios from "axios";
const REST_API_BASE_URL='http://localhost:8080/api/employees';

//REST Client code to make a REST API call using axios API to list all employees
export const listEmployee=() => axios.get(REST_API_BASE_URL);

//REST Client code to make a REST API call using axios API to Add new Employee
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

//REST Client code to make a REST API call using axios API to get edit Employee based on id 
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

//REST Client code to make a REST API call using axios API to update new Employee
export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee);

//REST Client code to make a REST API call using axios API to delete Employee
export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId);


