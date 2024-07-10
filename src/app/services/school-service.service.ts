import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../share/model/Student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl:string="https://localhost:44306/api/school"; 

  constructor(private httpClient:HttpClient) { }


  GetStudentList(){

    return this.httpClient.get<Student[]>(this.apiUrl);


  }

  GetById(id:number){

    return this.httpClient.get<Student>(this.apiUrl+`/${id}`)

  }


}
