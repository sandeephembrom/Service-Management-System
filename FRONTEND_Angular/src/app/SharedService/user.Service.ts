import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private userId: string = '';

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }
}