// src/app/employee-form/employee-form.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit{
  name = '';
  role = '';
  filter:any;
  rolesArr = ["Product Designer", "Flutter Developer", "QA Tester", "Product Owner"];
  selectedStartDate = new FormControl(new Date());
  selectedEndDate = new FormControl();

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const params:any = this.route.snapshot.queryParams;
    if (params.filter) {
      this.filter = JSON.parse(params.filter);
      this.name = this.filter.name;
      this.role = this.filter.role;
      this.selectedStartDate.setValue(this.filter.startDate);
      this.selectedEndDate.setValue(this.filter.endDate);
    }
  }

  addEmployee() {
    let obj:any = { name: this.name, role: this.role, startDate: this.selectedStartDate.value, endDate: this.selectedEndDate.value };
    if(this.filter){
      obj.id = this.filter.id;
      this.employeeService.updateEmployee(obj);
    }else{
      this.employeeService.addEmployee(obj);
    }
    this.cancelEmployee();
  }

  cancelEmployee(){
    this.router.navigate(['/employee/list']);
  }

  setNextMonday() {
    const today = new Date();
    const nextMonday = new Date(today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7)));
    this.selectedStartDate.setValue(nextMonday);
  }

  setNextTuesday() {
    const today = new Date();
    const nextTuesday = new Date(today.setDate(today.getDate() + ((2 + 7 - today.getDay()) % 7)));
    this.selectedStartDate.setValue(nextTuesday);
  }

  setAfterOneWeek() {
    const today = new Date();
    const afterOneWeek = new Date(today.setDate(today.getDate() + 7));
    this.selectedStartDate.setValue(afterOneWeek);
  }

  setToday(str:any) {
    str == 'start' ? this.selectedStartDate.setValue(new Date()) : this.selectedEndDate.setValue(new Date());
  }

  cancelSelection(str:any) {
    str == 'start' ? this.selectedStartDate.setValue(null) : this.selectedEndDate.setValue(null);
  }

  clearDate() {
    this.selectedEndDate.setValue(null);
  }

  saveDate(str:any) {
    const chosenDate = str == 'start' ? this.selectedStartDate.value : this.selectedEndDate.value;
    if (chosenDate) {
      alert('Selected Date: ' + chosenDate.toDateString());
    } else {
      alert('No date selected');
    }
  }
}
