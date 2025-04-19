import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { AdvertisementService } from './advertisement.service';
import { News, Advertisement } from '../models/model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newsList: News[] = [];
  advertisementList: Advertisement[] = [];

  constructor(
    private newsService: NewsService,
    private advertisementService: AdvertisementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNews();
    this.loadAdvertisements();
  }

  loadNews() {
    this.newsService.getNews().subscribe(data => {
      this.newsList = data;
    });
  }

  loadAdvertisements() {
    this.advertisementService.getAdvertisements().subscribe(data => {
      this.advertisementList = data;
    });
  }

  goToOlympiads() {
    this.router.navigate(['/olympiads']);
  }
}
