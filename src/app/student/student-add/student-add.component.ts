import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { StudentAdd } from '../../share/model/Student.model';
import { StudentService } from '../../services/school-service.service';
import { MatButtonModule } from '@angular/material/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {faCircleInfo, faUser,faUserCircle,} from '@fortawesome/free-solid-svg-icons';
import { SnackBarService } from '../../services/snack-bar-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'student-add',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule,FontAwesomeModule, MatButtonModule],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent {

formGroup:FormGroup;
loading=false;

faUser=faUser;
faAge=faCircleInfo;

numberRegEx = /\-?\d*\.?\d{1,2}/;

constructor(fb:FormBuilder, 
  private studentSvc:StudentService,
  private router:Router

){

  this.formGroup=fb.group({
    name:["",[Validators.required]],
    age:["",[Validators.required, Validators.pattern(this.numberRegEx), Validators.min(1),Validators.max(150)]]
})

}


AddStudent(){

  this.loading=true;

  let student:StudentAdd={
    name:this.formGroup.get("name")?.value,
    age:this.formGroup.get("age")?.value
  }

  this.studentSvc.AddStudent(student).subscribe({
 // next:(response)=>{},
  error:(error)=>{
    //this.snackBarSvc.OpenSnackBar({title:`${error.console.error}`, type:"ERROR"});
    //console.log(error);
  },
  complete:()=>{
    this.loading=false;
    this.router.navigate(['/']);
    // this.router.navigate(['admin/cost-center-edit'], {queryParams:{id:costCenter.idCcosto}, skipLocationChange:true});
  }


  })

}
get name(){return this.formGroup.get('name');}

get age(){return this.formGroup.get('age');}

}
