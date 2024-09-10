import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../share/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  readonly dialog = inject(MatDialog);

  constructor() { }


  OpenDialog(titleValue:string, body:string){    

    let matDialogConf = new MatDialogConfig();
    matDialogConf.data = {title:titleValue, value:body};
    matDialogConf.width='500px';
    matDialogConf.height='200px';
    //matDialogConf.panelClass=['dialogConf'];  

   return this.dialog.open(DialogComponent,matDialogConf);

  }

}
