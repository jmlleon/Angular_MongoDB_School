import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../share/snack-bar/snack-bar.component';
import { SnackBarData } from '../share/model/Student.model';



@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private snackBar = inject(MatSnackBar);
  
  constructor(    
  ) { }


  OpenSnackBarTest(content:string, action:string) {

    let snb = this.snackBar.open(content, action, { duration: 5000, panelClass:['snackBar-green'] });

    snb.onAction().subscribe(() => {
      snb.dismiss();
    });

  }

  OpenSnackBar(data: SnackBarData) {

    let snb = this.snackBar.openFromComponent(SnackBarComponent, {duration: 3000, data: data, panelClass:['snackBar'] })

    /*snb.afterDismissed().subscribe(() => {     
      //snb.dismiss();
    })*/


  }

}