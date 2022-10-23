import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, Subject } from 'rxjs';
import { Employee } from 'src/app/shared/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeeSubject: Subject<boolean> = new Subject;

  constructor(private readonly http: HttpClient) { }

  handleError(error: any): Observable<any> {
    console.error(error);

    alert('Terjadi kesalahan!');

    return EMPTY;
  }

  public getAll(): Observable<any> {
    return this.http.get<any>('https://63538223e64783fa82742172.mockapi.io/api/assignment/employees');
  }

  save(employee: Employee): Observable<any> {
    return this.http.post<any>(`https://63538223e64783fa82742172.mockapi.io/api/assignment/employees`, employee)
      .pipe(
        map(() => this.employeeSubject.next(true))
      )
  }

}
