package com.saeipe.ems.service.impl;

import com.saeipe.ems.dto.EmployeeDto;
import com.saeipe.ems.entity.Employee;
import com.saeipe.ems.exception.ResourceNotFoundException;
import com.saeipe.ems.mapper.EmployeeMapper;
import com.saeipe.ems.repository.EmployeeRepository;
import com.saeipe.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {


    private EmployeeRepository employeeRepository;

    //create new
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    //get employee by id
    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee with given ID doesnt exist : " + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    //to get all employees
    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employeeList=employeeRepository.findAll();
        return employeeList.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee= employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee with given Id doesnt exist" + employeeId)
        );
        employee.setFirstName((updatedEmployee.getFirstName()));
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee updatedEmployeeObj= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee with given Id doesnt exist" + employeeId)
        );
        employeeRepository.deleteById(employeeId);
    }

}
