import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { Student, StudentAdd } from '../../share/model/Student.model';
import { StudentService } from '../../services/school-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'student-add',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent {

formGroup:FormGroup;

loading=false;

constructor(fb:FormBuilder, private studentSvc:StudentService){

  this.formGroup=fb.group({
    name:["",[Validators.required]],
    age:["",[Validators.required]]
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
  error:(error)=>{},
  complete:()=>{
    this.loading=false;
  }


  })

}

}
