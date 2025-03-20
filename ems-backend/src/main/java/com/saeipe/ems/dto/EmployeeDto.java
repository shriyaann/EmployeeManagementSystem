package com.saeipe.ems.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//transform data between class and server
public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
