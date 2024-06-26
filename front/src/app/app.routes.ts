import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProgramsComponent } from './programs/programs.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';
import { ProgramDetailComponent } from './programs/program-detail/program-detail.component';
import {LoginComponent} from "./login/login.component";
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'exercices', component: ExercisesComponent },
    { path: 'exercise-detail/:id', component: ExerciseDetailComponent },
    { path: 'program-detail/:id', component: ProgramDetailComponent },
    { path: 'programmes', component: ProgramsComponent },
    { path: "profile", component: ProfileComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'inscription', component: RegisterComponent },
    { path: "connexion", component: LoginComponent }
];
