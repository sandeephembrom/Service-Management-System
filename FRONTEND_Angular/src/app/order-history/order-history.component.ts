import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Assuming UserService fetches user data
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserServices } from '../SharedService/user.Service';
import { SharedService } from '../SharedService/sharedService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  searchText: string = '';  // For search input
  bookings: any[] = [];  // To store the list of bookings
  currentUser: { username: string; role: string } | null = null;
  // adminLoggedIn: boolean = false;
  userUrl: string = 'http://localhost:5000'; // Backend URL

  // constructor(private userService: UserService, ) { }
  constructor(private sharedService: SharedService, private userService: UserService, private router: Router, private http: HttpClient, private userData: UserServices) {}

  
  ngOnInit(): void {
    // Retrieve current user information
    this.currentUser = this.userService.getCurrentUser();
    console.log('Current User:', this.currentUser); // Debugging line to check the user object
    console.log(this.userData.getUserId());

    // Set adminLoggedIn flag based on user role
    // if (this.currentUser && this.currentUser.role === 'admin') {
    //   this.adminLoggedIn = true; // Admin is logged in
    // } else {
    //   this.adminLoggedIn = false; // Not admin
    // }

    // console.log('Is Admin Logged In:', this.adminLoggedIn); // Debugging line to check the flag

    // Retrieve bookings
    // Fetch bookings for the user
    this.fetchBookings();
  }
    
  fetchBookings(): void {
      this.http.get<any>(`${this.userUrl}/book/getUser/${this.userData.getUserId()}`)
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


    // Retrieve bookings from localStorage
    // const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    // this.bookings = storedBookings.map((booking: any) => ({
    //   ...booking,
    //   customerName: 'Customer ' + booking.id, // Assuming customer name logic
    // }));
  // }

  // Filter bookings based on search text
  filteredBookings() {
    return this.bookings.filter(booking => 
      (booking.customerName.toLowerCase().includes(this.searchText.toLowerCase()) || 
      booking.id.toString().includes(this.searchText) || 
      booking.service.toLowerCase().includes(this.searchText.toLowerCase()) ||
      booking.subService.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  // Delete booking entry (only visible for admins)
  // deleteBooking(bookingId: number): void {
  //   console.log('Deleting booking with ID:', bookingId); // Debugging line to check booking ID

  //   if (confirm('Are you sure you want to delete this booking?')) {
  //     // Filter out the booking to delete
  //     this.bookings = this.bookings.filter(booking => booking.id !== bookingId);

  //     // Update localStorage with the updated bookings
  //     localStorage.setItem('bookings', JSON.stringify(this.bookings));
  //     console.log('Updated bookings:', this.bookings); // Debugging line to check updated bookings
  //   }
  // }
}
