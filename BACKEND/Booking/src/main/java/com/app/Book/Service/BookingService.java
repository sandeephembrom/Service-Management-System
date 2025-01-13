package com.app.Book.Service;

import com.app.Book.Model.Bookings;
import com.app.Book.Repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    
    public Bookings createBooking(Bookings booking) {
        return bookingRepository.save(booking);
    }

    public List<Bookings> getAllBookings() {
        return bookingRepository.findAll();
    }
    
//    public Bookings getBookingByServiceId(int serviceId) {
    
//        return bookingRepository.
//    findById(serviceId)
//                .orElseThrow(() -> new RuntimeException("Service Booked with Service ID: " + serviceId + " not available"));
//    }

    public Bookings getBookingByServiceId(int serviceId) {
        return bookingRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service Booked with Service ID: " + serviceId + " not available"));
    }

    public void deleteBooking(int serviceId) {
        Bookings booking = getBookingByServiceId(serviceId);
        bookingRepository.delete(booking);
    }

	public List<Bookings> getBookingsByUserId(int userId) {
		
		return bookingRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Bookings not found"));
	}
}
