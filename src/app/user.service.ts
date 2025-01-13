import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private showLogged = new Subject<void>();
  showLogin$ = this.showLogged.asObservable();

  private sessionStatus = new BehaviorSubject<boolean>(false); // Track session status
  sessionStatus$ = this.sessionStatus.asObservable();

  triggerShowLogin(): void {
    this.showLogged.next();
    this.updateSessionStatus(true); 
  }

  constructor() {}

  
  // Get the current user data from localStorage
  getCurrentUser(): { username: string; role: string } | null {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');

    if (userLoggedIn) {
      return JSON.parse(localStorage.getItem(userLoggedIn) || '{}');
    } else if (adminLoggedIn) {
      return JSON.parse(localStorage.getItem(adminLoggedIn) || '{}');
    }

    return null;
  }

  // Update session status
  updateSessionStatus(isLoggedIn: boolean): void {
    this.sessionStatus.next(isLoggedIn);
  }

  // Handle logout: clear login status and update session status
  logout(): void {
    this.updateSessionStatus(false); 
  }
}