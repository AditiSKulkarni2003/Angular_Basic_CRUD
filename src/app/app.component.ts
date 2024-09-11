import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EmpListComponent} from "./emp-list/emp-list.component";
import { CommonModule } from '@angular/common';
import {EmployeedetailsComponent} from "./EmpManagement/employeedetails/employeedetails.component";
import {DemoComponent} from "./demo/demo.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EmpListComponent,EmployeedetailsComponent,DemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularAssignment';
}
