import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ListpageComponent } from './listpage/listpage.component';
import { LoginComponent } from './login/login.component';
import { OlympiaddetailComponent } from './olympiaddetail/olympiaddetail.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'list', component: ListpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'olympiad/:id', component: OlympiaddetailComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
