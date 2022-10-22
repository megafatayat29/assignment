import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/shared/models/alert-message-interface';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  loading: boolean = false;
  loginAdmin!: Employee;
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

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    const loginAdmin: Employee = this.employeeForm.value;
    if (this.employeeForm.value.username === "alFaqir") {
      if (this.employeeForm.value.password === "H@sbiRobbi") {
        sessionStorage.setItem('username', loginAdmin.username);
        sessionStorage.setItem('submenu', 'list');

        this.message = {
          status: 'success',
          text: `Selamat, ${loginAdmin.username} berhasil login!`
        }
      } else {
        this.message = {
          status: 'warning',
          text: `Maaf, ${loginAdmin.username}. Password salah.`
        }
      }
    } else {
      this.message = {
        status: 'danger',
        text: `Maaf, ${loginAdmin.username} tidak terdaftar sebagai admin`
      }
    }

    setTimeout(() => {
      this.message = undefined;
    }, 10000);

    this.onReset();
    this.router.navigateByUrl('/dashboard/list');
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
