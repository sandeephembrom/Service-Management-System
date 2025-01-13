// // import { Component, OnInit } from '@angular/core';
// // import { UserService } from '../user.service';

// // @Component({
// //   selector: 'app-admin',
// //   templateUrl: './admin.component.html',
// //   styleUrls: ['./admin.component.css']
// // })
// // export class AdminComponent implements OnInit {
// //   searchText: string = '';  // For search input
// //   bookings: any[] = [];  // To store the list of bookings
// //   adminLoggedIn: boolean = false; // Flag for admin role
// //   selectedBooking: any = null; // To store the selected booking for deletion
// //   showConfirmation: boolean = false; // To show the confirmation modal
// //   showAcknowledgment: boolean = false; // To show the acknowledgment modal

// //   constructor(private userService: UserService) {}

// //   ngOnInit(): void {
// //     // Retrieve current user information
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
// //     // Check if currentUser is admin
// //     this.adminLoggedIn = currentUser && currentUser.role === 'admin';
  
// //     // Retrieve bookings from localStorage
// //     const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
// //     this.bookings = storedBookings.map((booking: any) => ({
// //       ...booking,
// //       customerName: booking.customerName || `Customer ${booking.id}`,
// //     }));
// //   }

// //   // Filter bookings based on search text
// //   filteredBookings() {
// //     return this.bookings.filter(booking =>
// //       booking.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
// //       booking.id.toString().includes(this.searchText) ||
// //       booking.service.toLowerCase().includes(this.searchText.toLowerCase()) ||
// //       booking.subService.toLowerCase().includes(this.searchText.toLowerCase())
// //     );
// //   }

// //   // Open confirmation modal for deletion
// //   confirmDelete(bookingId: number): void {
// //     this.selectedBooking = this.bookings.find(booking => booking.id === bookingId);
// //     this.showConfirmation = true;
// //   }

// //   // Close confirmation modal
// //   closeConfirmation(): void {
// //     this.showConfirmation = false;
// //     this.selectedBooking = null;
// //   }

// //   // Delete booking and show acknowledgment modal
// //   deleteBooking(bookingId: number): void {
// //     // Delete booking logic
// //     this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
// //     localStorage.setItem('bookings', JSON.stringify(this.bookings));
// //     this.showConfirmation = false;

// //   }

  
// // }
// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css']
// })
// export class AdminComponent implements OnInit {
//   searchText: string = ''; // For search input
//   bookings: any[] = []; // To store the list of bookings
//   adminLoggedIn: boolean = false; // Flag for admin role
//   selectedBooking: any = null; // Currently selected booking for confirmation
//   showConfirmation: boolean = false; // For confirmation modal
//   showAcknowledgment: boolean = false; // For acknowledgment modal
//   userUrl: string = 'http://localhost:5000'; // Backend URL

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
//     this.adminLoggedIn = currentUser && currentUser.role === 'admin';
//     this.fetchBookings();
//   }

//   fetchBookings(): void {
//     this.http.get<any>(`${this.userUrl}/book`).subscribe({
//       next: (response) => {
//         this.bookings = response.map((booking: any) => ({
//           id: booking.bookingId,
//           customerName: booking.username,
//           service: booking.service,
//           subService: booking.subService,
//           date: new Date(booking.date),
//           vendor: booking.vendor,
//           amount: booking.amount,
//           status: booking.status
//         }));
//       },
//       error: (err: HttpErrorResponse) => {
//         alert('Error fetching bookings.');
//         console.error('Error fetching bookings:', err);
//       }
//     });
//   }

//   filteredBookings(): any[] {
//     return this.bookings.filter((booking) =>
//       booking.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
//       booking.id.toString().includes(this.searchText) ||
//       booking.service.toLowerCase().includes(this.searchText.toLowerCase()) ||
//       booking.subService.toLowerCase().includes(this.searchText.toLowerCase())
//     );
//   }

//   confirmDelete(bookingId: number): void {
//     this.selectedBooking = this.bookings.find((booking) => booking.id === bookingId);
//     this.showConfirmation = true;
//   }

//   closeConfirmation(): void {
//     this.showConfirmation = false;
//     this.selectedBooking = null;
//   }

//   deleteBooking(): void {
//     if (!this.selectedBooking) return;

//     this.http.delete(`${this.userUrl}/book/${this.selectedBooking.id}`).subscribe({
//       next: () => {
//         this.bookings = this.bookings.filter((booking) => booking.id !== this.selectedBooking.id);
//         this.fetchBookings();
//         this.showConfirmation = false;
//         this.showAcknowledgment = true;
//       },
//       error: (err) => {
//         console.error('Error deleting booking:', err);
//         alert('Failed to delete booking. Please try again.');
//       }
//     });
//   }

  

//   closeAcknowledgment(): void {
//     this.showAcknowledgment = false;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserServices } from '../SharedService/user.Service';
import { SharedService } from '../SharedService/sharedService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  searchText: string = '';  // For search input
  bookings: any[] = [];  // To store the list of bookings
  adminLoggedIn: boolean = false; // Flag for admin role
  userUrl: string = 'http://localhost:5000'; // Backend URL

  constructor(private sharedService: SharedService, private userService: UserService, private router: Router, private http: HttpClient, private userData: UserServices) {}
  // constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Retrieve current user information
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
    // Check if currentUser is admin
    this.adminLoggedIn = currentUser && currentUser.role === 'admin';
  
    this.fetchBookings();
    // Retrieve bookings from localStorage
    // const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    // this.bookings = storedBookings.map((booking: any) => ({
    //   ...booking,
    //   customerName: booking.customerName || `Customer ${booking.id}`,
    // }));
  }


  fetchBookings(): void {
    this.http.get<any>(`${this.userUrl}/book`)
      .subscribe({
        next: (response) => {
          // Map the response to match the property names expected in the template
        this.bookings = response.map((booking: any) => ({
          id: booking.bookingId,  // Mapping to id
          customerName: booking.username,  // Mapping to customerName
          service: booking.service,
          subService: booking.subService,
          date: new Date(booking.date),  // Ensuring date is a Date object
          vendor: booking.vendor,
          amount: booking.amount,
          status: booking.status
          }));
        console.log('Bookings fetched:', this.bookings);
        },
        
        error: (err: HttpErrorResponse) => {
          alert("Error during Admin Booking Fetching");
          console.log('Error during Admin Booking Fetching');
        }
      });
  }

  // Filter bookings based on search text
  filteredBookings() {
    return this.bookings.filter(booking =>
      booking.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      booking.id.toString().includes(this.searchText) ||
      booking.service.toLowerCase().includes(this.searchText.toLowerCase()) ||
      booking.subService.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Delete booking entry
  // deleteBooking(bookingId: number): void {
  //   if (confirm(`Are you sure you want to delete booking with ID: ${bookingId}?`)) {
  //     this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
  //     localStorage.setItem('bookings', JSON.stringify(this.bookings));
  //     alert('Booking deleted successfully!');
  //   }
  // }

  deleteBooking(bookingId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this booking?');
  
    if (confirmDelete) {
      // Make the DELETE request to the backend
      this.http.delete(`${this.userUrl}/book/${bookingId}`).subscribe({
        next: (response) => {
          // On success, remove the booking from the local array
          this.bookings = this.bookings.filter(booking => booking.bookingId !== bookingId);
          this.fetchBookings();
          // window.location.reload();
          // alert('Booking deleted successfully');
        },
        // error: (err: HttpErrorResponse) => {
        //   // Handle error during deletion
        //   console.error('Error deleting booking:', err);
        //   // alert('Failed to delete booking. Please try again.');
        // }
      });
    }
  }
  
}