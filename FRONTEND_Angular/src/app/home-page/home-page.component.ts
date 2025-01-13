import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  userLoggedIn: boolean = false;
  adminLoggedIn: boolean = false; // Admin login flag
  currentUser: { username: string; role: string } | null = null;
  isLoggedIn:Boolean=false;

  subServices: Record<string, string[]> = {
    AC: ['AC Repair', 'Refrigerator Repair', 'Washing Machine Repair'],
    Cleaning: ['Kitchen Cleaning', 'Bathroom Cleaning', 'Carpet Cleaning'],
    Vehicle: ['Bike Repair', 'Car Repair', 'Truck Repair'],
    PickupDrop: ['Food Delivery', 'Parcel Delivery', 'Grocery Delivery'],
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
    this.userService.sessionStatus$.subscribe((status)=>{
      this.isLoggedIn=status;  });
  }

 

 

  // Handle service clicks
  handleServiceClick(serviceType: string): void {
    if (this.userLoggedIn) {
      this.router.navigate(['/booking-form'], { queryParams: { serviceType } });
    } else {
      alert('Please log in to access this service.');
    }
  }

  // Get service image based on service type
  getServiceImage(serviceType: string): string {
    const serviceImages: Record<string, string> = {
      AC: 'https://as2.ftcdn.net/v2/jpg/05/11/92/95/1000_F_511929539_hkrzPKGI6pEA8TwUfrwrB0g73FyEaowM.jpg',
      Cleaning: 'https://t4.ftcdn.net/jpg/03/06/99/87/240_F_306998742_5awR6uVsZ8dRNdHHnj0tnm4sGUDBAxQ5.jpg',
      Vehicle: 'https://t4.ftcdn.net/jpg/05/18/13/69/240_F_518136924_9q60nudwE0Hys7xgFPRvK4glJIqAHqy0.jpg',
      PickupDrop: 'https://t4.ftcdn.net/jpg/09/21/78/05/240_F_921780563_Cn8ThVl9OSmiCcq0nIJtQglGPqm5snAH.jpg',
    };
    return serviceImages[serviceType] || '';
  }

  // Get service title based on service type
  getServiceTitle(serviceType: string): string {
    const serviceTitles: Record<string, string> = {
      AC: 'AC & Appliances Repair',
      Cleaning: 'House Cleaning',
      Vehicle: 'Vehicle Repair Service',
      PickupDrop: 'Product Pickup/Drop',
    };
    return serviceTitles[serviceType] || 'Service';
  }

  

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/sign-in']);
  }

  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
