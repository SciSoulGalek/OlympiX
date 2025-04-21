import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataService: DataService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Get olympiad from route or API (depending on your implementation)
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.dataService.getOlympiadById(id).subscribe(olympiad => {
      this.olympiad = olympiad;
      this.olympiadId = olympiad.id;
    });
  }


  submitRegistration(form: any) {
    const token = this.auth.getToken();
  
    const headers = {
      'Authorization': `Token ${token}`
    };
  
    const body = {
      olympiadId: this.olympiad.id,
      answer: form.value.answer
    };
  
    this.http.post('http://localhost:8000/api/registrations/', body, { headers }).subscribe(
      res => console.log('Registration successful'),
      err => console.error('Error submitting registration:', err)
    );
  }
  
}
