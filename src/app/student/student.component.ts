import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogData, MatDialogResponse, PageOptions, PaginationFilter, Student } from '../share/model/Student.model';
import { StudentService } from '../services/school-service.service';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '../services/dialog-service.service';
import { Router } from '@angular/router';
import { concatMap, filter, iif, isEmpty, map, of, Subject, switchMap, takeUntil, takeWhile, tap } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'student',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FontAwesomeModule,
    MatPaginatorModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit, OnDestroy, AfterViewInit {

  private ngDestroy$=new Subject<boolean>();

  displayColumns=['actions','id', 'name', 'age'];  
  columns = ['remove','edit','id', 'name', 'age'];

  faRemove=faTrash;faEdit=faEdit;

  studentList=new MatTableDataSource<Student>;

  loading = true;

  private studentSvc=inject(StudentService);
  private dialogSvc=inject(DialogService);
  private router=inject(Router);

  selectedStudent={} as Student;

  pageOptions=new PageOptions;

  paginationFilter=new PaginationFilter;

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor() {}

  ngAfterViewInit(): void {
      
    this.studentList.paginator=this.paginator;

    this.paginator.page.pipe(takeUntil(this.ngDestroy$)).subscribe((event)=>{

      this.paginationFilter.pageNumber=event.pageIndex+1;
      this.paginationFilter.pageSize=event.pageSize;

      //console.log("The pagination filter is "+JSON.stringify(this.paginationFilter));

      //make a Pagination Filter call

      this.GetStudentList();

      
    })


  }
  
  
  ngOnDestroy(): void {
    this.ngDestroy$.next(true);    
  }

  ngOnInit(): void {  
   
    this.GetStudentList();
    this.OnRemove();
  }

  GetStudentList() {    
    
    this.studentSvc.GetList(this.paginationFilter).pipe(takeUntil(this.ngDestroy$)).subscribe({
     
      next: (response) => {
        this.studentList.data = response;         
        //this.pageOptions.length=this.studentList.data.length;

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

    var data:MatDialogData={
      title:"Do you want remove the student?",
      body:student.name
    };

    this.selectedStudent=student;    
    this.dialogSvc.SendDialogData(data);      
    
  }

  
  OnRemove(){
  
    this.dialogSvc.dialogOut$.pipe(takeUntil((this.ngDestroy$)),filter((dialogResponse)=>dialogResponse===MatDialogResponse.OK),
    concatMap(()=>this.studentSvc.Remove(this.selectedStudent.id)),tap(()=>this.loading=true),concatMap(()=>this.studentSvc.GetList(this.paginationFilter))).subscribe({

      next:(result)=>{
        this.studentList.data = result;
        this.loading=false;       
      },
     
      error: () => {
        this.loading = false;       
      },       
      
    });

  }

  Edit(student:Student){
   
  this.studentSvc.SetStudent(student);
  this.router.navigate(['student-add'],{queryParams:{opt:"edit"}});

  }


   
}
