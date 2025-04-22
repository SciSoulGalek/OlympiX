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
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  olympiad!: Olympiad;
  olympiadId!: number;
  answers: { [key: string]: string } = {};

  registrationStatus: string = '';
  isRegistering: boolean = false;
  isRegistered: boolean = false;  // To track the registration state

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

      // 🔽 NEW: Check if user has already registered
      this.http.get<any[]>(`http://localhost:8000/api/registration/olympiad/${this.olympiadId}/`, { withCredentials: true })
        .subscribe(registrations => {
          const match = registrations.find(reg => reg.olympiad.id === this.olympiadId);
          if (match) {
            this.registrationStatus = match.status; // could be "Pending", "Registered", etc.
          }
        });
    });
  }

  // Check if the user is registered, pending, or already approved
  checkRegistrationStatus() {
    this.dataService.getOlympiadRegistrationStatus(this.olympiadId).subscribe(status => {
      if (status === 'pending') {
        this.registrationStatus = 'Your registration is pending approval.';
        this.isRegistered = true;  // Prevent further registration
      } else if (status === 'approved') {
        this.registrationStatus = 'You are already registered for this Olympiad.';
        this.isRegistered = true;  // Prevent further registration
      } else {
        this.registrationStatus = ''; // No registration
        this.isRegistered = false;  // Allow registration
      }
    });
  }

  register() {
    this.isRegistering = true;

    this.http.post(`http://localhost:8000/api/registration/olympiad/${this.olympiadId}/`, {
      answers: this.answers
    }, { withCredentials: true }).subscribe({
      next: (response: any) => {
        if (response.status === 'already_registered') {
          this.registrationStatus = 'You have already registered for this Olympiad.';
        } else if (response.status === 'registered') {
          this.registrationStatus = 'Registration submitted successfully!';
        } else {
          this.registrationStatus = 'Unexpected response.';
        }


        window.alert(this.registrationStatus);

        this.isRegistering = false;
      },
      error: () => {
        this.registrationStatus = 'Failed to register.';
        window.alert(this.registrationStatus);
        this.isRegistering = false;
      }
    });
  }




  goBack() {
    this.router.navigate([`/olympiad/${this.olympiadId}`]);
  }
}
