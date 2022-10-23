import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/shared/models/alert-message-interface';
import { Employee } from 'src/app/shared/models/employee';
import { EmployeeService } from '../list/service/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  loading: boolean = false;
  employee!: Employee;
  message?: AlertMessage;

  employeeForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    birthDate: new FormControl(null, [Validators.required]),
    basicSalary: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    group: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  })

  constructor(
    private readonly router: Router,
    private readonly employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    const employee: Employee = this.employeeForm.value;

    this.employeeService.save(employee)
      .subscribe(
        {
          next: (value: any) => {
            this.onReset();
            this.message = {
              status: 'success',
              text: `Congrats, ${employee.firstName} has been registered!`
            }
          },
          error: (error: any) => {
            console.log(error);
            this.message = {
              status: 'danger',
              text: error.error ? error.error.message : error.message
            }
          },
          complete: () => this.loading = false
        }
      );

    setTimeout(() => {
      this.message = undefined;
    }, 10000);
  }

  onReset(): void {
    this.employeeForm.reset();
  }

  isFieldValid(fieldName: string, parent?: AbstractControl): { [key: string]: boolean } {
    let control: AbstractControl = this.employeeForm.get(fieldName) as AbstractControl;

    const classes = {
      'is-invalid': false,
      'is-valid': false
    }

    if (parent) {
      control = parent;
    }
    if (control && control.touched && control.invalid) {
      classes['is-invalid'] = true;
    } else if (control && control.valid) {
      classes['is-valid'] = true;
    }

    return classes;
  }

  renderEmailErrMessage(): string {
    const errorObj = this.employeeForm.controls?.['email']?.errors
    if (errorObj?.['required']) {
      return 'Email harus diisi'
    }
    return 'Email tidak valid'
  }

}
