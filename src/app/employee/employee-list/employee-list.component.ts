// src/app/employee-list/employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees$ = this.employeeService.employeesSignal;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.employeeService.loadEmployees();
    setTimeout(() => {
      this.employees$ = this.employeeService.employeesSignal;
    }, 100);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
    this.loadData();
  }

  addEmployee(){
    this.router.navigate(['/employee/form']);
  }

  editEmp(obj:any){
    this.router.navigate(['/employee/form'], { queryParams: { filter: JSON.stringify(obj)}});
  } 
}
