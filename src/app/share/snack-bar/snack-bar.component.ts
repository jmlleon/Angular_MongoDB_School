import { Component, Inject } from '@angular/core';

import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import { SnackBarBgMode, SnackBarData } from '../model/Student.model';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'snack-bar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {

 cssColor:string="";

  constructor(
    public sbRef:MatSnackBarRef<SnackBarComponent>,
     @Inject(MAT_SNACK_BAR_DATA) public data:SnackBarData
     ) { }

  ngOnInit(): void {

    this.cssColor=this.data.type==="OK" ? SnackBarBgMode.OK: SnackBarBgMode.ERROR;

  }


  Close=()=>this.sbRef.dismiss(); 


}
