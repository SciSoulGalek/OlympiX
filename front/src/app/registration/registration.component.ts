import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

interface Olympiad {
  id: number;
  name: string;
  description: string;
  field: string;
  country: string;
  date: string;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  olympiad!: Olympiad;
  olympiadId!: number;
  answers: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.dataService.getOlympiadById(id).subscribe(olympiad => {
      this.olympiad = olympiad;
      this.olympiadId = olympiad.id;
    });
  }

  register() {
    this.http.post(`http://localhost:8000/api/registration/olympiad/${this.olympiadId}/`, {
      answers: this.answers
    }).subscribe({
      next: () => alert('Registration submitted!'),
      error: err => {
        console.error('Registration failed:', err);
        alert('Failed to register.');
      }
    });
  }

  goBack() {
    this.router.navigate([`/olympiad/${this.olympiadId}`]);
  }
}
