import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ListpageComponent } from './listpage/listpage.component';
import { LoginComponent } from './login/login.component';
import { OlympiaddetailComponent } from './olympiaddetail/olympiaddetail.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyOlympiadsComponent } from './myolymp/myolymp.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'list', component: ListpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'olympiad/:id', component: OlympiaddetailComponent },
  { path: 'register/:id', component: RegistrationComponent},
  { path: 'my-olympiads', component: MyOlympiadsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
