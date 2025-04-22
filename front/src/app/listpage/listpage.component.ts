import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { RouterModule, Router } from '@angular/router';

interface Olympiad {
  id: number;
  name: string;
  description: string;
  field: string;
  country: string;
  date: ""
}

@Component({
  selector: 'app-listpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listpage.component.html',
  styleUrl: './listpage.component.css'
})

export class ListpageComponent implements OnInit {
  fields: string[] = ['All fields', 'Math', 'Science', 'Programming', 'Art', 'Sports', 'History', 'Music'];
  selectedField: string = 'All fields';
  search: string = '';

  olympiads: Olympiad[] = [];
  filteredOlympiads: Olympiad[] = [];
  
  selectedTab = 'future';

  constructor(private dataService: DataService, public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.dataService.getOlympiads().subscribe(data => {
      this.olympiads = data;
      this.applyFilters();
    });
  }  

  applyFilters() {
    const now = new Date();
    this.filteredOlympiads = this.olympiads.filter(o => {
      const matchesSearch = o.name.toLowerCase().includes(this.search.toLowerCase());
      const matchesField = this.selectedField === 'All fields' || o.field === this.selectedField;
      const isFuture = new Date(o.date) >= now;
      const matchesTab = this.selectedTab === 'future' ? isFuture : !isFuture;
  
      return matchesSearch && matchesField && matchesTab;
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/olympiad', id]);
  }

  getFilteredOlympiads() {
    const now = new Date();
    if (this.selectedTab === 'future') {
      return this.olympiads.filter(o => new Date(o.date) >= now);
    } else {
      return this.olympiads.filter(o => new Date(o.date) < now);
    }
  }
}
