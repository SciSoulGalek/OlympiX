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
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/']); // or homepage path
      },
      error: err => {
        this.error = 'Invalid credentials';
      }
    });
  }

  register() {
    this.auth.register(this.username, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/']);
      },
      error: err => {
        this.error = 'Registration failed';
      }
    });
  }
}
