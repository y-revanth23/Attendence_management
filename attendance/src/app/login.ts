import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMsg = '';

  login() {
    if (this.username === 'gsc' && this.password === 'gsc@2026') {
      localStorage.setItem('auth', 'true');
      window.location.reload();
    } else {
      this.errorMsg = "Invalid Username or Password!";
    }
  }
}