import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OlympiadListComponent } from './olympiads/olympiad-list/olympiad-list.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'olympiads', component: OlympiadListComponent },
  { path: 'login', component: LoginComponent },
  {path:'', redirectTo: 'login', pathMatch: 'full'},
];
