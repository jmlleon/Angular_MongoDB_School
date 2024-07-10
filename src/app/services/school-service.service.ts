import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../share/model/Student.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolServiceService {

  apiUrl:string="http://localhost:/api/school";

  constructor(private httpClient:HttpClient) { }


  GetStudentList(){

    return this.httpClient.get<Student[]>(this.apiUrl);


  }


}
