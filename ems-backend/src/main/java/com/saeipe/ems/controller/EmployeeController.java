package com.saeipe.ems.controller;

import com.saeipe.ems.dto.EmployeeDto;
import com.saeipe.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private EmployeeService employeeService;

    //Build add(POST) employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createEmployee((employeeDto));
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //Build GET employee using REST API
    @GetMapping("{id}")  //map incoming http request to this method
    public ResponseEntity<EmployeeDto> getEmployeeId(@PathVariable("id") Long employeeId){ //map id to url template variable (id ) to the variable employeeId using @PathVariable
        EmployeeDto employeeDto= employeeService.getEmployeeById(employeeId);
        return  ResponseEntity.ok(employeeDto);
    }


    //Build GET all employees using REST API
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employeeDtoList = employeeService.getAllEmployees();
        return ResponseEntity.ok(employeeDtoList);
    }

    //Build Update Employee REST API
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updateEmployee){
        EmployeeDto updatedEmployeeDto= employeeService.updateEmployee(employeeId,updateEmployee);
        return ResponseEntity.ok(updatedEmployeeDto);
    }

    //Build Delete Employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully.");
    }
}
