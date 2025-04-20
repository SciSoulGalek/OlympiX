import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ListpageComponent } from './listpage/listpage.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'list', component: ListpageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
