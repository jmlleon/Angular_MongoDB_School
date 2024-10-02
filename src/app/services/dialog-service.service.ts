import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../share/dialog/dialog.component';
import { MatDialogData } from '../share/model/Student.model';
import { Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  private readonly dialog = inject(MatDialog);

  private dialogInSubject=new Subject<MatDialogData>();  
  private dialogIn$=this.dialogInSubject.asObservable();

  public dialogOut$=new Subject<string>();

  constructor() { 

    this.dialogIn$.pipe(switchMap((data)=>this.OpenDialog(data))).subscribe((data)=>{

      this.dialogOut$.next(data);

    })

  }

  SendDialogData(data:MatDialogData){

    this.dialogInSubject.next(data);

  }


 private OpenDialog(dialogData:MatDialogData){    

    let matDialogConf:MatDialogConfig = {
      data :dialogData,
      width:'500px',
      height:'200px'
    };
   
    return this.dialog.open(DialogComponent,matDialogConf).afterClosed();

  }

}
