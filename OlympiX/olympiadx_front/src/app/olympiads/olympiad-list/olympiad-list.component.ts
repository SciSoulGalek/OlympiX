import { Component, OnInit } from '@angular/core';
import { OlympiadService } from '../olympiad.service';
import { Olympiad } from '../../models/model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-olympiad-list',
  templateUrl: './olympiad-list.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./olympiad-list.component.css']
})
export class OlympiadListComponent implements OnInit {

  olympiads: Olympiad[] = [];
  filteredOlympiads: Olympiad[] = [];

  countryFilter: string = '';
  fieldFilter: string = '';
  searchText: string = '';

  constructor(private olympiadService: OlympiadService) { }

  ngOnInit(): void {
    this.loadOlympiads();
  }

  loadOlympiads() {
    this.olympiadService.getOlympiads().subscribe(data => {
      this.olympiads = data;
      this.filteredOlympiads = data;
    });
  }

  register(olympiadId: number) {
    this.olympiadService.registerOlympiad(olympiadId).subscribe(() => {
      alert('Вы успешно зарегистрировались на олимпиаду!');
    });
  }

  applyFilters() {
    this.filteredOlympiads = this.olympiads.filter(olympiad =>
      (this.countryFilter ? olympiad.country.toLowerCase().includes(this.countryFilter.toLowerCase()) : true) &&
      (this.fieldFilter ? olympiad.field.toLowerCase().includes(this.fieldFilter.toLowerCase()) : true) &&
      (this.searchText ? olympiad.name.toLowerCase().includes(this.searchText.toLowerCase()) : true)
    );
  }
}
