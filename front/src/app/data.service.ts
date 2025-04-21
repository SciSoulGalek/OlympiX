import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  submitRegistration(registrationData: any) {
    const token = localStorage.getItem('token');
    return this.http.post(
      'http://localhost:8000/api/registrations/',
      registrationData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  
}
