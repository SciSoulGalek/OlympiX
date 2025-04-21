import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-olympiads',
  templateUrl: './myolymp.component.html',
  imports: [CommonModule],
  styleUrls: ['./myolymp.component.css']
})
export class MyOlympiadsComponent implements OnInit {
  approvedOlympiads: any[] = [];
  pendingOlympiads: any[] = [];
  pastOlympiads: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/my-olympiads/').subscribe(data => {
      const today = new Date();
      for (let item of data) {
        const olympiadDate = new Date(item.olympiad.date);
        if (olympiadDate < today) {
          this.pastOlympiads.push(item);
        } else if (item.approved) {
          this.approvedOlympiads.push(item);
        } else {
          this.pendingOlympiads.push(item);
        }
      }
    });
  }
}
