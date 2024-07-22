import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentAddComponent } from './student/student-add/student-add.component';

export const routes: Routes = [

    { path: '',title:"Student Component", component: StudentComponent},
    { path: 'student-add',title:"Student Add Component", component: StudentAddComponent},

];
