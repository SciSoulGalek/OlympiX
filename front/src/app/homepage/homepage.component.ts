import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { RouterModule, Router } from '@angular/router';

interface News {
  id: number;
  title: string;
  content: string;
  date: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  newsList: News[] = [];

  constructor(private http: HttpClient, public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.http.get<News[]>('http://localhost:8000/api/news/')
      .subscribe(data => {
        this.newsList = data;
      });
  }

  goToNewsDetail(id: number) {
    this.router.navigate(['/news', id]);
  }
}

