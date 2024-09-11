import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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
export class StudentComponent implements OnInit, OnDestroy {

  private ngDestroy$=new Subject<boolean>();

  displayColumns=['actions','id', 'name', 'age'];  
  columns = ['remove','edit','id', 'name', 'age'];

  faRemove=faTrash;
  faEdit=faEdit;

  studentList: Student[] = [];
  loading = true;

  constructor(
  private studentSvc: StudentService,
  private dialogSvc:DialogService,
  private router:Router

  ) {}
  
  
  ngOnDestroy(): void {

    this.ngDestroy$.next(true);
    
  }

  ngOnInit(): void {
    this.GetStudentList();
  }

  GetStudentList() {
    this.studentSvc.GetList().pipe(takeUntil(this.ngDestroy$)).subscribe({
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

        this.studentSvc.Remove(student.id).subscribe({        
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
   
  this.studentSvc.SetStudent(student);

  this.router.navigate(['student-add'],{queryParams:{opt:"edit"}});

  }
}
