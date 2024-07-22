import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student, StudentAdd } from '../share/model/Student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl:string="https://localhost:44306/api/school"; 

  constructor(private httpClient:HttpClient) { }

  /*let params=new HttpParams();
    params=params.append("pageNumber", paginationFilter.pageNumber);
    params=params.append("pageSize", paginationFilter.pageSize);
    params=params.append("sortOrder", paginationFilter.sortOrder);

    return this.httpClient.get<CostCenterSales[]>(`${environment.apiUrl}${this.appUrl}/sales`, {headers:this.httpHeaders, params:params});
   */

  GetStudentList(){

    return this.httpClient.get<Student[]>(this.apiUrl);


  }

  GetById(id:number){

    return this.httpClient.get<Student>(this.apiUrl+`/${id}`)

  }

  AddStudent(studentAdd:StudentAdd){

    return this.httpClient.post<Student>(this.apiUrl,studentAdd);
  }


}
