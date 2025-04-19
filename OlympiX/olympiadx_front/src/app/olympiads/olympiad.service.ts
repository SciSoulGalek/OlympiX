import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Olympiad} from '../models/model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OlympiadService {
  private apiUrl = 'http://localhost:8080/api/olympiads';
  private registerUrl = 'http://localhost:8080/api/register';

  constructor(private http: HttpClient) { }
  getOlympiads(){
    return this.http.get<Olympiad[]>(this.apiUrl);
  }
  registerOlympiad(olympiadId: number): Observable<any> {
    return this.http.post(this.registerUrl, { olympiad: olympiadId });
  }
}
