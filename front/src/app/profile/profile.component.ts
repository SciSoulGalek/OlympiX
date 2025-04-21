// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      bio: [''],
      phone_number: [''],
      school: [''],
      grade: [''],
      olympiad_interests: ['']
    });

    this.loadProfile();
  }

  loadProfile() {
    this.data.getProfile().subscribe({
      next: (data: any) => {
        this.profileForm.patchValue(data);
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  saveProfile() {
    this.data.updateProfile(this.profileForm.value).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: (err) => console.error('Error updating profile:', err)
    });
  }
}
