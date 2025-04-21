import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  getOlympiads(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/olympiads/');
  }

  getUserRegistrations(): Observable<any> {
    return this.http.get('http://localhost:8000/api/my-registrations/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    });
  }
}
