import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username = '';
  password = '';
  confirmPassword = ''; // only used for register
  error: string | null = null;
  success: string | null = null;

  isRegisterMode = false;

  constructor(private auth: AuthService, private router: Router) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.error = null;
    this.success = null;
  }

  submit() {
    if (this.isRegisterMode) {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }
      this.auth.register(this.username, this.password).subscribe({
        next: () => {
          this.success = "Registration successful. You can now log in.";
          this.error = null;
          this.isRegisterMode = false;
        },
        error: () => {
          this.error = "Registration failed.";
          this.success = null;
        }
      });
    } else {
      this.auth.login(this.username, this.password).subscribe({
        next: (response) => {
          this.auth.saveToken(response.token);
          this.router.navigate(['/profile']);
        },
        error: () => {
          this.error = "Login failed. Check your credentials.";
        }
      });
    }
  }
}
