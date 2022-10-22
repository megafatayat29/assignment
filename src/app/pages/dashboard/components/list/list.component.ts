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
  nama: any;
  p: any = 1;

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
        console.log(resp);
        console.log(resp.id);
      },
      error: console.error,
      complete: () => { this.loading = false },
    }

    this.loading = true;
    this.employeeService.getAll()
      .subscribe(this.subscriber);
  }

  searchVerif() {
    if (this.nama == "") {
      this.ngOnInit();
    } else {
      this.employee = this.employee.filter(res => {
        // return res.nama.toLocaleLowerCase().match(this.nama.toLocaleLowerCase())
      })
    }
  }

  onView(noPeserta: string): void {
    this.router.navigateByUrl(`/account/${noPeserta}`);
  }
}
