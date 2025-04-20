import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-detail.component.html'
})
export class NewsDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  router = inject(Router);

  newsId: string | null = null;
  news: any = null;

  ngOnInit() {
    this.newsId = this.route.snapshot.paramMap.get('id');
    if (this.newsId) {
      this.http.get(`http://localhost:8000/api/news/${this.newsId}/`)
        .subscribe(data => {
          this.news = data;
        });
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
