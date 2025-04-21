// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;
  isLoading = true;
  errorMessage: string | null = null;
  profileData: any = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      username: [{value: '', disabled: true}, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: [''],
      last_name: [''],
      phone_number: [''],
      school: [''],
      grade: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profileForm.patchValue({
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number || '',
          school: data.school || '',
          grade: data.grade || ''
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
      this.profileForm.get('username')?.disable(); // Keep username disabled
    } else {
      this.profileForm.disable();
      this.profileForm.get('username')?.disable(); // Ensure username stays disabled
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isLoading = true;
    const formValue = this.profileForm.getRawValue(); // Gets all values including disabled
    
    this.authService.updateProfile(formValue).subscribe({
      next: () => {
        this.isEditing = false;
        this.profileForm.disable();
        this.profileForm.get('username')?.disable();
        this.isLoading = false;
        // Optional: Show success message
      },
      error: (err) => {
        this.errorMessage = 'Failed to update profile';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}