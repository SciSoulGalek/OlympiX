import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';

interface Olympiad {
  id: number;
  name: string;
  short_description: string;
  full_description: string;
  field: string;
  country: string;
  date: string;
  winner: string | null;
}

@Component({
  selector: 'app-olympiad-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './olympiaddetail.component.html',
  styleUrls: ['./olympiaddetail.component.css']
})
export class OlympiaddetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  olympiadId: string | null = null;
  olympiad: any = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.olympiadId = this.route.snapshot.paramMap.get('id');
    if (this.olympiadId) {
      this.http.get(`http://localhost:8000/api/olympiads/${this.olympiadId}/`)
        .subscribe(data => {
          this.olympiad = data;
        });
    }
  }

  isCompleted(): boolean {
    return new Date(this.olympiad.date) < new Date();
  }

  goToRegister() {
    this.dataService.setOlympiad(this.olympiad);
    this.router.navigate(['/register', this.olympiad.id]);
  }

  router = inject(Router);

  goBack() {
    this.router.navigate(['/list']);
  }
}
