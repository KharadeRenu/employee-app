import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee/list/onload', pathMatch:'full' },
  { path: 'employee/list/onload', component: EmployeeListComponent },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }