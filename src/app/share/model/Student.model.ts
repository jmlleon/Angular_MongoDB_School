

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