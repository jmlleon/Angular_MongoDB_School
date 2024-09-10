import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'; 

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  dialogRef=inject(MatDialogRef<DialogComponent>);

  constructor(   
    @Inject(MAT_DIALOG_DATA) public data: {title: string, value:string}
  ){ }

  
  okDialog(){this.dialogRef.close("ok");}  
  
  cancelDialog() {this.dialogRef.close('close');}


}
