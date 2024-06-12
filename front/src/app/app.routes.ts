import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProgramsComponent } from './programs/programs.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'exercices',
        component: ExercisesComponent
    },
    {
        path: 'exercise-detail/:id',
        component: ExerciseDetailComponent
    },
    {
        path: 'programmes',
        component: ProgramsComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'inscription',
        component: RegisterComponent
    }
];
