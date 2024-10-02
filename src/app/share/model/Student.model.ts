
export type SnackBarData={

    title:string,
    type:string
    
}


export type MatDialogData={

    title:string,
    body:string
    
}

export enum MatDialogResponse{
    OK="OK",
    CANCEL="CANCEL"
}

export enum SnackBarBgMode{

        OK="bg-green-500",
        ERROR="bg-red-600"

}

export class PageOptions{

    length:number=10;
    pageSize:number=10;
    pageIndex:number=0;    
    pageSizeOptions:number[]=[2,5];

}

export class PaginationFilter{

    pageNumber: number=1;  
    pageSize: number=5;
    sortOrder:string="asc";
  
   /* constructor(pageNumber: number,  
      pageSize: number,
      sortOrder:string){
  
        this.pageNumber=pageNumber;
        this.pageSize=pageSize;
        this.sortOrder=sortOrder;
  
    }*/
}  


export class Student{

    public id:string="";           
    public name:string="";          
    public age:number=-1;

    constructor(id:string, name:string, age:number){
        this.id=id;
        this.name=name;
        this.age=age;
    }


}

export type StudentAdd=Omit<Student, "id">;