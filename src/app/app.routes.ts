import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentAddComponent } from './student/student-add/student-add.component';

export const routes: Routes = [

    { path: '',title:"Student List Component", component: StudentComponent},
    //{ path: 'student-list',title:"Student List Component", component: StudentComponent},
    { path: 'student-add',title:"Student Add Component", component: StudentAddComponent},

];
