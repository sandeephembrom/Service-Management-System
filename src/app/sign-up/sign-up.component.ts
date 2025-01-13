import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserServices } from '../SharedService/user.Service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  successMessage: string = '';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  showPasswordConstraints: boolean = false;
  showUsernameConstraints: boolean = false;
  userUrl: string = "http://localhost:4000";

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private userService: UserServices) {
    this.signUpForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]+[A-Za-z0-9]*$'), // Prevent space in username
          Validators.maxLength(50)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,30}$'
          )
        ]
      ],
      confirmPassword: [
        '',
        [Validators.required]
      ],
      address: ['', [
        Validators.required,
        Validators.maxLength(100),
        this.noMoreThanTwoSpacesValidator
      ]],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?!0{10})\\d{10}$')
        ]
      ],
      role: ['user', [Validators.required]]  // Added role field (user or admin)
    });

    // Validator for matching passwords
    this.signUpForm.get('confirmPassword')?.setValidators([ 
      Validators.required,
      this.passwordMatchValidator.bind(this)
    ]);
  }

  // Password match validator
  passwordMatchValidator(control: any) {
    if (this.signUpForm && control.value !== this.signUpForm.get('password')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Custom validator to prevent more than two consecutive spaces in address
  noMoreThanTwoSpacesValidator(control: any) {
    const value = control.value;
    if (value && /\s{3,}/.test(value)) {
      return { tooManySpaces: true };
    }
    return null;
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // Generates a random alphanumeric user ID
  private generateUserId(): string {
    const userId = Math.floor(Math.random() * 10000000).toString();
    return userId;
  }

  // Handles the registration process
  registerUser(): void {
    if (this.signUpForm.valid) {
      const user = { 
        ...this.signUpForm.value, 
        userId: this.generateUserId(),
        loggedIn: false,  // New property to track login status
      };

      const userData = {
          id: this.generateUserId(),
          username: this.signUpForm.get('username')?.value,
          email: this.signUpForm.get('email')?.value,
          password: this.signUpForm.get('password')?.value,
          address: this.signUpForm.get('address')?.value,
          contact: this.signUpForm.get('contact')?.value,
      };
      
      this.userService.setUserId(userData.id);

      this.http.post(`${this.userUrl}/customer`, userData).subscribe({
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
        }
      });

      // Store user data in localStorage with userId as the key
      localStorage.setItem(userData.id, JSON.stringify(userData));
      
      this.successMessage = `Registration successful! Your User ID is ${userData.id}`;
      
      // Redirect to Sign-In page after 3 seconds
      setTimeout(() => {
        this.router.navigate(['/sign-in']);
      }, 4000);
    }
  }
}
