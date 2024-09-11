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

  private student:Student={} as Student;
  student$=new Observable<Student>;
  private studentSubject=new BehaviorSubject<Student>(this.student);


  constructor(private httpClient:HttpClient) {

    this.student$=this.studentSubject.asObservable();

   }  

    SetStudent(student:Student){

      this.student=student;
      this.studentSubject.next(this.student);

    }

  GetList(){

    return this.httpClient.get<Student[]>(this.apiUrl);
    
  }

  GetById(id:number){

    return this.httpClient.get<Student>(`${this.apiUrl}/${id}`)

  }

  Add(studentAdd:StudentAdd){

    return this.httpClient.post<Student>(this.apiUrl, studentAdd);
    
  }

  Set(id:string,student:Student){   

    return this.httpClient.put(`${this.apiUrl}/${id}`,student);

  }

  Remove(studentId:string){

    return this.httpClient.delete(`${this.apiUrl}/${studentId}`);

  }


}
