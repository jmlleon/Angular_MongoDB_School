import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student, StudentAdd } from '../share/model/Student.model';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl=environment.APIUrl; 

  private student:Student={id:"", name:"", age:-1};
  student$=new Observable<Student>;
  private studentSubject=new BehaviorSubject<Student>(this.student);


  constructor(private httpClient:HttpClient) {

    this.student$=this.studentSubject.asObservable();

   }

  /*let params=new HttpParams();
    params=params.append("pageNumber", paginationFilter.pageNumber);
    params=params.append("pageSize", paginationFilter.pageSize);
    params=params.append("sortOrder", paginationFilter.sortOrder);

    return this.httpClient.get<CostCenterSales[]>(`${environment.apiUrl}${this.appUrl}/sales`, {headers:this.httpHeaders, params:params});
   */

    SetStudent(student:Student){

      this.student=student;
      this.studentSubject.next(this.student);

    }

  GetStudentList(){

    return this.httpClient.get<Student[]>(this.apiUrl);
    
  }

  GetById(id:number){

    return this.httpClient.get<Student>(this.apiUrl+`/${id}`)

  }

  Add(studentAdd:StudentAdd){

    return this.httpClient.post<Student>(this.apiUrl, studentAdd);
    
  }

  Set(studentId:string,student:Student){

    return this.httpClient.put<any>(this.apiUrl,student);

  }

  Remove(studentId:string){

    return this.httpClient.delete(`${this.apiUrl}/${studentId}`);

  }


}
