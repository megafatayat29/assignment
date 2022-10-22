import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { AlertMessage } from 'src/app/shared/models/alert-message-interface';
import { Employee } from 'src/app/shared/models/employee';
import { Response } from 'src/app/shared/models/response';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  admin: boolean = false;
  subscriber!: Observer<any>;
  loading: boolean = false;
  @Input() employee: Employee[] = [];
  message?: AlertMessage;
  username: any;
  first: any;
  p: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes: any = [3, 6, 9, 12, 15, 18];

  constructor(
    private readonly router: Router,
    private readonly employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.isAdmin();
    this.getAll();
  }

  isAdmin(): void {
    const user = sessionStorage.getItem('username');
    if (user == "alFaqir") {
      this.admin = true;
    }
  }

  getAll(): void {
    this.subscriber = {
      next: (resp: any) => {
        for (let i = 0; i < resp.length; i++) {
          const element = resp[i];
          element.employee.id = element.id;
          this.employee.push(element.employee);
        }
      },
      error: console.error,
      complete: () => { this.loading = false },
    }

    this.loading = true;
    this.employeeService.getAll()
      .subscribe(this.subscriber);
  }

  searchByUsername() {
    if (this.username == "") {
      this.ngOnInit();
    } else {
      this.employee = this.employee.filter(res => {
        return res.username.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
    }
  }

  searchByFirstName() {
    if (this.first == "") {
      this.ngOnInit();
    } else {
      this.employee = this.employee.filter(res => {
        return res.username.toLocaleLowerCase().match(this.first.toLocaleLowerCase())
      })
    }
  }

  onTableDataChange(event: any) {
    this.p = event;
    this.getAll();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.p = 1;
    this.getAll();
  }

  onView(idEmployee: string): void {
    this.router.navigateByUrl(`/account/${idEmployee}`);
  }
}
