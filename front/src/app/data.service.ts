import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class DataService {
  private olympiad: any;

  constructor(private http: HttpClient) {}

  getOlympiads(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/olympiads/');
  }

  getOlympiadById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/olympiads/${id}/`);
  }  

  setOlympiad(olympiad: any) {
    this.olympiad = olympiad;
  }

  getUserRegistrations(): Observable<any> {
    return this.http.get('http://localhost:8000/api/my-registrations/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    });
  }

  registerOlympiad(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/registrations/', data);
  }

  getOlympiadRegistrationStatus(olympiadId: number) {
    return this.http.get<string>(`http://localhost:8000/api/registration/olympiad/${olympiadId}/status/`);
  }

  getProfile() {
    return this.http.get<any>('http://localhost:8000/api/profile/');
  }
  
  updateProfile(data: any) {
    return this.http.patch<any>('http://localhost:8000/api/profile/', data);
  }
}
