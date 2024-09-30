// src/app/services/employee.service.ts
import { computed, Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Signal, signal } from '@angular/core';

interface Employee {
  id: number;
  name: string;
  role: string;
  startDate: any;
  endDate: any;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private dbPromise = openDB('employee-db', 1, {
    upgrade(db) {
      db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
    },
  });

  // Signals for reactive state management
  employeesSignal: Signal<Employee[]> = signal([]);

  async addEmployee(employee: Omit<Employee, 'id'>) {
    const db = await this.dbPromise;
    await db.add('employees', employee);
    this.loadEmployees();
  }

  async updateEmployee(employee: Employee) {
    const db = await this.dbPromise;
    await db.put('employees', employee);
    this.loadEmployees();
  }

  async deleteEmployee(id: number) {
    const db = await this.dbPromise;
    await db.delete('employees', id);
    this.loadEmployees();
  }

  async loadEmployees() {
    const db = await this.dbPromise;
    const employees = await db.getAll('employees');
    this.employeesSignal = computed(() => employees);
    console.log('Employees list in service: ', this.employeesSignal());
    // this.employeesSignal.set(employees); // Using Signals to update the state
  }
}
