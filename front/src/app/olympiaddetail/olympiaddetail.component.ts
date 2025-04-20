import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Olympiad {
  id: number;
  name: string;
  description: string;
  field: string;
  country: string;
}

@Component({
  selector: 'app-olympiad-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './olympiaddetail.component.html'
})
export class OlympiaddetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  olympiadId: string | null = null;
  olympiad: any = null;

  ngOnInit() {
    this.olympiadId = this.route.snapshot.paramMap.get('id');
    if (this.olympiadId) {
      this.http.get(`http://localhost:8000/api/olympiads/${this.olympiadId}/`)
        .subscribe(data => {
          this.olympiad = data;
        });
    }
  }

  router = inject(Router);

  goBack() {
    this.router.navigate(['/list']);
  }
}
