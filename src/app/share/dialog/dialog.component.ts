import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'; 
import { MatDialogData, MatDialogResponse } from '../model/Student.model';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  dialogRef=inject(MatDialogRef<DialogComponent>);
  //{title: string, value:string}

  constructor(   
    @Inject(MAT_DIALOG_DATA) public data:MatDialogData
  ){ }

  
  OK=()=>this.dialogRef.close(MatDialogResponse.OK);
  
  Cancel=()=>this.dialogRef.close(MatDialogResponse.CANCEL);


}
