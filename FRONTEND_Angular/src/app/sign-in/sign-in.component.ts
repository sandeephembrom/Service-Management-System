import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {UserServices} from '../SharedService/user.Service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInForm: FormGroup; // Form group for sign-in
  errorMessage: string = ''; // Error message for invalid login
  showPassword: boolean = false; // Toggle password visibility
  userUrl: string = 'http://localhost:4000'; // Backend URL
  // private shareService: SharedService,

  constructor(private userService: UserService,   private fb: FormBuilder, private router: Router, private http: HttpClient, private userServices:UserServices) {
    // Initialize the form with validations
    this.signInForm = this.fb.group({
      userId: ['', [Validators.required]], // Validate User ID
      password: ['', [Validators.required]], // Validate Password
    });
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handle login
  loginUser(): void {
    if (this.signInForm.valid) {
      const { userId, password } = this.signInForm.value;
  
      if (userId === '9874563' && password === 'admin@123') {
        // Navigate to admin route if credentials match
        this.router.navigate(['/admin']);
        return;
      }
  
      const userLoginData = {
        id: userId,
        password: password,
      };
  
      this.userServices.setUserId(userLoginData.id);
  
      // Call API for user authentication
      this.http.post(`${this.userUrl}/customer/login`, userLoginData).subscribe({
        next: (response: any) => {
          // If login is successful, navigate to home
          this.userService.triggerShowLogin();
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          // Handle errors
          if (err.status === 401) {
            this.errorMessage = 'Invalid Password. Please try again.';
          } else if (err.status === 404) {
            this.errorMessage = 'Invalid User or Password.Please try again.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        },
      });
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
  
}
