import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";

interface Registration {
  id: number;
  registered_at: string;
  olympiad: {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    field: string;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  activeTab: 'current' | 'past' = 'current';
  registrations: Registration[] = [];
  currentRegistrations: Registration[] = [];
  pastRegistrations: Registration[] = [];

  constructor(
      public auth: AuthService,
      private data: DataService,
      private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadRegistrations();
  }

  loadRegistrations() {
    this.data.getUserRegistrations().subscribe({
      next: (data: any) => {
        this.registrations = data;
        this.filterRegistrations();
      },
      error: (err) => console.error('Ошибка загрузки:', err)
    });
  }

  filterRegistrations() {
    const now = new Date();
    this.currentRegistrations = this.registrations.filter(reg => {
      return new Date(reg.olympiad.end_date) > now;
    });

    this.pastRegistrations = this.registrations.filter(reg => {
      return new Date(reg.olympiad.end_date) <= now;
    });
  }

  isOlympiadEnded(olympiad: any): boolean {
    return new Date(olympiad.end_date) < new Date();
  }

  getOlympiadStatus(olympiad: any): string {
    const now = new Date();
    const start = new Date(olympiad.start_date);
    const end = new Date(olympiad.end_date);

    if (now < start) return 'Ожидается';
    if (now >= start && now <= end) return 'В процессе';
    return 'Завершена';
  }
  
  formatDate(date: string | Date): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ru-RU');
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
