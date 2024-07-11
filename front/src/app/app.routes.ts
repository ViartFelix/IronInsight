import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ExercisesComponent} from './exercises/exercises.component';
import {ProgramsComponent} from './programs/programs.component';
import {ContactComponent} from './contact/contact.component';
import {RegisterComponent} from './register/register.component';
import {ExerciseDetailComponent} from './exercises/exercise-detail/exercise-detail.component';
import {ProgramDetailComponent} from './programs/program-detail/program-detail.component';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from './profile/profile.component';
import {AuthentificatedGuard} from "./authentificated.guard";
import {ProgramNewComponent} from "./programs/program-new/program-new.component";
import { ExerciseCreationComponent } from './exercises/exercise-creation/exercise-creation.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'exercices', component: ExercisesComponent },
    { path: 'exercise-detail/:id', component: ExerciseDetailComponent },
    { path: 'exercice-creation', component: ExerciseCreationComponent, canActivate: [AuthentificatedGuard] },
    { path: 'program-detail/:id', component: ProgramDetailComponent },
    { path: 'programmes', component: ProgramsComponent },
    { path: 'programme-new', component: ProgramNewComponent, canActivate: [AuthentificatedGuard]},
    { path: "profile", component: ProfileComponent, canActivate: [AuthentificatedGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AuthentificatedGuard] },
    { path: 'inscription', component: RegisterComponent },
    { path: "connexion", component: LoginComponent }
];
