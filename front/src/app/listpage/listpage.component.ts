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
}

@Component({
  selector: 'app-listpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listpage.component.html',
  styleUrl: './listpage.component.css'
})

export class ListpageComponent implements OnInit {
  fields: string[] = ['Math', 'Science', 'Programming', 'Art'];
  selectedField: string = '';
  search: string = '';

  olympiads: Olympiad[] = [];
  filteredOlympiads: Olympiad[] = [];

  constructor(private dataService: DataService, public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.dataService.getOlympiads().subscribe(data => {
      this.olympiads = data;
      this.filteredOlympiads = data;
    });
  }

  applyFilters() {
    this.filteredOlympiads = this.olympiads.filter(o =>
      o.name.toLowerCase().includes(this.search.toLowerCase()) &&
      (this.selectedField ? o.field === this.selectedField : true)
    );
  }

  goToDetail(id: number) {
    this.router.navigate(['/olympiad', id]);
  }
}
