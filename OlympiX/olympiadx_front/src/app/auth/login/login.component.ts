import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // << добавить!
import { FormsModule } from '@angular/forms';     // << добавить!

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,         // << обязательно standalone
  imports: [CommonModule, FormsModule],  // << здесь подключаем модули
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Неверное имя пользователя или пароль';
      }
    });
  }
}
