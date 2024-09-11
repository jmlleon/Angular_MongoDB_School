import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { Student, StudentAdd } from '../../share/model/Student.model';
import { StudentService } from '../../services/school-service.service';
import { MatButtonModule } from '@angular/material/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {faCircleInfo, faUser,faUserCircle,} from '@fortawesome/free-solid-svg-icons';
import { SnackBarService } from '../../services/snack-bar-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage-service.service';

@Component({
  selector: 'student-add',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule,FontAwesomeModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent implements OnInit, OnDestroy {


private ngDestroy$ = new Subject<boolean>();

formGroup:FormGroup;
loading=false;

faUser=faUser;
faAge=faCircleInfo;

numberRegEx = /\-?\d*\.?\d{1,2}/;

optType:string|null="";

selectedStudent={} as Student;


constructor(
  fb:FormBuilder, 
  private studentSvc:StudentService,
  private router:Router,
  private activeRoute:ActivatedRoute,
  private localstorageSvc:LocalStorageService

){

  this.formGroup=fb.group({
    name:["",[Validators.required]],
    age:["",[Validators.required, Validators.pattern(this.numberRegEx), Validators.min(1),Validators.max(150)]]
});

}
  

ngOnInit(): void {    

    this.activeRoute.queryParamMap.pipe(takeUntil(this.ngDestroy$)).subscribe((param) => {
    
      this.optType = param.get('opt');    
     
     if(this.optType==="edit"){ 
      
      this.GetStudentSelected();
      
     }else{

      this.formGroup.get("name")?.setValue("");
      this.formGroup.get("age")?.setValue("");

     }
      
    }); 

}



GetStudentSelected(){
    
  let studentFromStorage:Student=JSON.parse(this.localstorageSvc.getItem("studentSelected")!); 

  if(studentFromStorage!==undefined && studentFromStorage!==null){ 
    
    this.selectedStudent=studentFromStorage;
    this.localstorageSvc.removeItem("studentSelected");

  }else{

    this.studentSvc.student$.pipe(takeUntil(this.ngDestroy$)).subscribe(response=>{

      this.selectedStudent=response;     
    });
  }

  this.formGroup.get("name")?.setValue(this.selectedStudent.name);
  this.formGroup.get("age")?.setValue(this.selectedStudent.age);
  
}



ngOnDestroy(): void {
  this.ngDestroy$.next(true);
  //console.log("destroy");
}

Add(){

  this.loading=true;

  let student:StudentAdd={
    name:this.formGroup.get("name")?.value,
    age:this.formGroup.get("age")?.value
  }

  this.studentSvc.Add(student).pipe(takeUntil(this.ngDestroy$)).subscribe({ 
  error:(error)=>{    
  },
  complete:()=>{
    this.loading=false;
    this.router.navigate(['/']);    
  }
  })

}

Edit(){

  this.loading=true;

  var student:Student={

    id:this.selectedStudent!.id,
    name:this.formGroup.get("name")?.value,
    age:this.formGroup.get("age")?.value

  };

  this.studentSvc.Set(student.id, student).pipe(takeUntil(this.ngDestroy$)).subscribe({
    error:(err)=>{
      console.error(err);
      this.loading=false;
    },
    complete:()=>{  
      this.loading=false;
      this.router.navigate(['/']);
     },
   })

}

get name(){return this.formGroup.get('name');}

get age(){return this.formGroup.get('age');}


@HostListener('window:beforeunload', ['$event'])
beforeUnloadHandler($event: Event): void {  
  
  this.localstorageSvc.setItem("studentSelected", JSON.stringify(this.selectedStudent)); 

}  

}
