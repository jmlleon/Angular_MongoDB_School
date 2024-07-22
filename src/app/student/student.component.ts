import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Student } from '../share/model/Student.model';
import { StudentService } from '../services/school-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'student',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  columns=["id","name", "age"];

  studentList:Student[]=[];
  loading=true;
  
  constructor(private schoolSvc:StudentService){}

  ngOnInit(): void {

    this.GetStudentList();
  } 


  GetStudentList(){

    
this.schoolSvc.GetStudentList().subscribe({

  next:response=>{this.studentList=response;},
  error:err=>{
        console.log(err);
    this.loading=false;
   },
  complete:()=>{
    this.loading=false;
  }

})

  }


}
