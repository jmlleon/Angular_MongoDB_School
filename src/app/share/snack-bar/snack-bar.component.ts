import { Component, Inject } from '@angular/core';

import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';


export type SnackBarData={

  title:string,
  type:string
  
  }

@Component({
  selector: 'snack-bar',
  standalone: true,
  imports: [],
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

   if(this.data.type==="OK"){

    this.cssColor="bg-green-500";

   }else{

    this.cssColor="bg-red-600";

   }


  }


  Close(){this.sbRef.dismiss();}


  afterDismissed(){

    this.sbRef.afterDismissed().subscribe(()=>{   
    })
  }

  onAction(){

    this.sbRef.onAction().subscribe(()=>{      
    })

  }


}
