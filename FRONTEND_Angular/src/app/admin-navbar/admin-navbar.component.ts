import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent {
  userLoggedIn: boolean = false; // Example for user login state
  adminLoggedIn: boolean = false; // Example for admin login state

  constructor(private router: Router) {
    // Check if the user or admin is logged in
    this.userLoggedIn = !!localStorage.getItem('userLoggedIn');
    this.adminLoggedIn = !!localStorage.getItem('adminLoggedIn');
  }

  logout(): void {
    // Clear login status from localStorage
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('adminLoggedIn');

    // Redirect to login page
    this.router.navigate(['/sign-in']);
  }
}
