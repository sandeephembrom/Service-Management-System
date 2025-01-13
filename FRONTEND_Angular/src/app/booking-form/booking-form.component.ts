// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { UserService } from '../user.service';
// import { UserServices } from '../SharedService/user.Service';
// import { SharedService } from '../SharedService/sharedService';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-booking-form',
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css']
// })
// export class BookingComponent implements OnInit {
//   userUrl: string = "http://localhost:5000";

//   services = ['Appliance Repair', 'House Cleaning', 'Vehicle Repair', 'PickupDrop'];
//   subServiceMapping: any = {
//     'Appliance Repair': ['AC Repair', 'Refrigerator Repair', 'Washing Machine Repair'],
//     'House Cleaning': ['Kitchen Cleaning', 'Bathroom Cleaning', 'Carpet Cleaning'],
//     'Vehicle Repair': ['Bike Repair', 'Car Repair', 'Truck Repair'],
//     'PickupDrop': ['Food Delivery', 'Parcel Delivery', 'Grocery Delivery']
//   };
//   vendors = [
//     { name: 'Vendor 1', amount: 1000 },
//     { name: 'Vendor 2', amount: 2000 },
//     { name: 'Vendor 3', amount: 3000 }
//   ];

//   selectedService = '';
//   subServices: string[] = [];
//   selectedSubService = '';
//   bookingDate: string = '';
//   minDate: string = new Date().toISOString().split('T')[0];
//   address: string = '';
//   selectedVendor: any = null;
//   dateError: string = '';
//   username: string = '';
//   bookingAcknowledgment: any = null;

//   constructor(private sharedService: SharedService, private userService: UserService, private router: Router, private http: HttpClient, private userData: UserServices) {}

//   ngOnInit(): void {}

//   onServiceChange() {
//     this.subServices = this.subServiceMapping[this.selectedService] || [];
//     this.selectedSubService = ''; // Reset selected sub-service
//   }

//   onVendorChange() {
//     // Placeholder for vendor-specific logic if needed
//   }

//   validateDate(): boolean {
//     const selectedDate = new Date(this.bookingDate);
//     const currentDate = new Date();
//     this.dateError = selectedDate < currentDate ? 'Date cannot be in the past' : '';
//     return selectedDate >= currentDate;
//   }

//   submitBooking(bookingForm: any) {
//     if (bookingForm.invalid || !this.validateDate()) return;

//     const booking = {
//       id: Date.now(),
//       userId: this.userData.getUserId(),
//       username: this.username,
//       service: this.selectedService,
//       subService: this.selectedSubService,
//       date: this.bookingDate,
//       address: this.address,
//       vendor: this.selectedVendor?.name,
//       amount: this.selectedVendor?.amount
//     };

//     console.log(this.userData.getUserId());    
//     console.log("Hello");    
    
//     this.http.post(`${this.userUrl}/book`, booking).subscribe({
      
//       error: (err: HttpErrorResponse) => {
//         console.log(err.error);
//       }

//     });

//     // Save to localStorage
//     const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
//     bookings.push(booking);
//     localStorage.setItem('bookings', JSON.stringify(bookings));

//     // Display acknowledgment
//     this.bookingAcknowledgment = {
//       id: booking.userId,
//       service: booking.service,
//       subService: booking.subService
//     };

//     alert('Booking submitted successfully!');

//     // Reset form
//     this.resetForm(bookingForm);
//   }

//   resetForm(bookingForm: any) {
//     bookingForm.reset();
//     this.selectedService = '';
//     this.selectedSubService = '';
//     this.selectedVendor = null;
//     this.bookingDate = '';
//     this.address = '';
//     this.username = '';
//     this.dateError = '';
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { UserServices } from '../SharedService/user.Service';
import { SharedService } from '../SharedService/sharedService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingComponent implements OnInit {
  userUrl: string = "http://localhost:5000";

  services = ['Appliance Repair', 'House Cleaning', 'Vehicle Repair', 'PickupDrop'];
  subServiceMapping: any = {
    'Appliance Repair': ['AC Repair', 'Refrigerator Repair', 'Washing Machine Repair'],
    'House Cleaning': ['Kitchen Cleaning', 'Bathroom Cleaning', 'Carpet Cleaning'],
    'Vehicle Repair': ['Bike Repair', 'Car Repair', 'Truck Repair'],
    'PickupDrop': ['Food Delivery', 'Parcel Delivery', 'Grocery Delivery']
  };
  vendors = [
    { name: 'Vendor 1', amount: 1000 },
    { name: 'Vendor 2', amount: 2000 },
    { name: 'Vendor 3', amount: 3000 }
  ];

  selectedService = '';
  subServices: string[] = [];
  selectedSubService = '';
  bookingDate: string = '';
  minDate: string = new Date().toISOString().split('T')[0];
  address: string = '';
  selectedVendor: any = null;
  dateError: string = '';
  username: string = '';
  bookingAcknowledgment: any = null;
  isModalVisible: boolean = false; // Track modal visibility

  constructor(private sharedService: SharedService, private userService: UserService, private router: Router, private http: HttpClient, private userData: UserServices) {}

  ngOnInit(): void {}

  onServiceChange() {
    this.subServices = this.subServiceMapping[this.selectedService] || [];
    this.selectedSubService = ''; // Reset selected sub-service
  }

  onVendorChange() {
    // Placeholder for vendor-specific logic if needed
  }

  validateDate(): boolean {
    const selectedDate = new Date(this.bookingDate);
    const currentDate = new Date();
    this.dateError = selectedDate < currentDate ? 'Date cannot be in the past' : '';
    return selectedDate >= currentDate;
  }

  submitBooking(bookingForm: any) {
    if (bookingForm.invalid || !this.validateDate()) return;

    const booking = {
      id: Date.now(),
      userId: this.userData.getUserId(),
      username: this.username,
      service: this.selectedService,
      subService: this.selectedSubService,
      date: this.bookingDate,
      address: this.address,
      vendor: this.selectedVendor?.name,
      amount: this.selectedVendor?.amount
    };

    this.http.post(`${this.userUrl}/book`, booking).subscribe({
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      }
    });

    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Display acknowledgment
    this.bookingAcknowledgment = { ...booking };
    this.isModalVisible = true; // Show modal

    // Reset form
    this.resetForm(bookingForm);
  }

  resetForm(bookingForm: any) {
    bookingForm.reset();
    this.selectedService = '';
    this.selectedSubService = '';
    this.selectedVendor = null;
    this.bookingDate = '';
    this.address = '';
    this.username = '';
    this.dateError = '';
  }

  closeModal() {
    this.isModalVisible = false; // Hide modal
  }
}
