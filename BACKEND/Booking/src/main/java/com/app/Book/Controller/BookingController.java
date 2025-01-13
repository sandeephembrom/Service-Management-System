package com.app.Book.Controller;

import com.app.Book.Model.Bookings;
import com.app.Book.Service.BookingService;
import com.app.Book.config.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/book")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    
//    @DeleteMapping("/{serviceId}")
//    public String deleteBooking(@PathVariable int serviceId) {
//    	
//        bookingService.deleteBooking(serviceId);
//        return "Service booked with Service ID " + serviceId + " is successfully deleted from your account.";
//    }
    
    @PostMapping
    public Integer createBooking(@RequestBody Bookings booking) {
    	
        Bookings savedBooking = bookingService.createBooking(booking);
        return savedBooking.getBookingId();
    }
    
//    @GetMapping
//    public List<Bookings> getAllBookings() {
//    	
//        return bookingService.getAllBookings();
//    }
//    
//    @DeleteMapping("/{serviceId}")
//    public String deleteBooking(@PathVariable int serviceId) {
//    	
//        bookingService.deleteBooking(serviceId);
//        return "Service booked with Service ID " + serviceId + " is successfully deleted from your account.";
//    }

    // Get All Bookings Data
    @GetMapping
    public List<Bookings> getAllBookings() {
    	
        return bookingService.getAllBookings();
    }
    
    @GetMapping("/getUser/{userId}")
    public List<Bookings> findByUserId(@PathVariable int userId) {
    	
        return bookingService.getBookingsByUserId(userId);
    }
    
    @DeleteMapping("/{serviceId}")
    public Boolean deleteBooking(@PathVariable int serviceId) {
    	
        bookingService.deleteBooking(serviceId);
        return true;
//        return "Service booked with Service ID " + serviceId + " is successfully deleted from your account.";
    }

    @GetMapping("/{serviceId}")
    public Bookings getBookingByServiceId(@PathVariable int serviceId) {
    	
        return bookingService.getBookingByServiceId(serviceId);
    }

}
