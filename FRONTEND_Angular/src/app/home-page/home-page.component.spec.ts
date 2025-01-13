import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userLoggedIn: boolean = false;
  currentUser: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.userLoggedIn = this.userService.isUserLoggedIn();
    
    // If logged in, fetch the current user
    if (this.userLoggedIn) {
      this.currentUser = this.userService.getCurrentUser();
    }
  }

  // Handle logout functionality
  logout(): void {
    this.userService.logout();  // Clear user data from UserService
    this.router.navigate(['/sign-in']);  // Redirect to sign-in page
  }

  // Navigate to the sign-up page if the user is not logged in
  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
