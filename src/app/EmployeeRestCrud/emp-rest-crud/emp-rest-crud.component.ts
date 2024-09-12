import { Component, OnInit } from '@angular/core';
import { EmpRestCrudService } from '../../services/emp-rest-crud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultantDelivery, Manager, AssociateConsultantDelivery, Employee } from '../../models/empRestCrud';
import {EmpManagementServiceService} from "../../services/emp-management-service.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-emp-rest-crud',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './emp-rest-crud.component.html',
  styleUrls: ['./emp-rest-crud.component.css'],
  providers: [EmpRestCrudService],

})
export class EmpRestCrudComponent implements OnInit {
  showForm = false;
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isEditMode = false;

  employee: Employee = {
    empName: '',
    empCompanyName: '',
    empBloodGroup: '',
    gcmLevel: '',
    dassId: '',
    empType: ''
  };

  constructor(private employeeService: EmpRestCrudService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  selectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isEditMode = true;
    this.employee = { ...employee };

    // Handle type-specific data initialization
    if (this.isConsultantDelivery(employee)) {
      this.employee = { ...employee, ...{ consultingLevel: (employee as ConsultantDelivery).consultingLevel, leadProjects: (employee as ConsultantDelivery).leadProjects } };
    } else if (this.isManager(employee)) {
      this.employee = { ...employee, ...{ teamSize: (employee as Manager).teamSize, location: (employee as Manager).location } };
    } else if (this.isAssociateConsultantDelivery(employee)) {
      this.employee = { ...employee, ...{ skillSet: (employee as AssociateConsultantDelivery).skillSet, projectRole: (employee as AssociateConsultantDelivery).projectRole, reportsTo: (employee as AssociateConsultantDelivery).reportsTo } };
    }
  }

  createEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe(() => {
      this.loadEmployees();
      this.resetForm();
    });
  }

  updateEmployee(): void {
    if (this.selectedEmployee && this.employee.empId) {
      this.employeeService.updateEmployee(this.employee.empId, this.employee).subscribe(() => {
        this.loadEmployees();
        this.resetForm();
      });
    }
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  resetForm(): void {
    this.employee = {
      empName: '',
      empCompanyName: '',
      empBloodGroup: '',
      gcmLevel: '',
      dassId: '',
      empType: ''
    };
    this.selectedEmployee = null;
    this.isEditMode = false;
    this.showForm = false;

  }
  toggleForm(): void {
    this.showForm = !this.showForm; // Toggle form visibility
    if (!this.showForm) {
      this.resetForm(); // Reset form when hidden
    }
  }



  isConsultantDelivery(employee: Employee): employee is ConsultantDelivery {
    return employee.empType === 'ConsultantDelivery';
  }

  isManager(employee: Employee): employee is Manager {
    return employee.empType === 'Manager';
  }

  isAssociateConsultantDelivery(employee: Employee): employee is AssociateConsultantDelivery {
    return employee.empType === 'AssociateConsultantDelivery';
  }



}
