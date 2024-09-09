import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Student } from '../share/model/Student.model';
import { StudentService } from '../services/school-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '../services/dialog-service.service';

@Component({
  selector: 'student',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FontAwesomeModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {

  displayColumns=['actions','id', 'name', 'age'];  
  columns = ['remove','edit','id', 'name', 'age'];

  faRemove=faTrash;
  faEdit=faEdit;

  studentList: Student[] = [];
  loading = true;

  constructor(
  private schoolSvc: StudentService,
  private dialogSvc:DialogService

  ) {}

  ngOnInit(): void {
    this.GetStudentList();
  }

  GetStudentList() {
    this.schoolSvc.GetStudentList().subscribe({
      next: (response) => {
        this.studentList = response;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  remove(student:Student) {   

    var data={
      titleValue:"Do you want remove the student?",
      body:student.name
    };
   
    let dialog=this.dialogSvc.OpenDialog(data.titleValue, data.body);

    dialog.afterClosed().subscribe(response=>{

      if(response==="ok"){

        this.schoolSvc.Remove(student.id).subscribe({
          next: (response) => {},
          error: (error) => {
            console.error(error);
          },
          complete: () => {

            this.GetStudentList();

          },
        });

      }


    })
   
    
  }

  Edit(student:Student){

   this.schoolSvc.SetStudent(student.id, student).subscribe({

    error:(err)=>{console.error(err);},
    complete() {   },

   })

  }
}
