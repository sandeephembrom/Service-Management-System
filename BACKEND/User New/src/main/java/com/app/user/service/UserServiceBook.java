package com.app.user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

//import com.app.Book.Model.Bookings;
import com.app.user.model.BookingModel;

@FeignClient(name="Booking")
public interface UserServiceBook {
//	@GetMapping("bookings/{userId}")
//    public Optional<List<BookingModel>>  getBookingsByUserId(@PathVariable("userId") int userId);
	
    @GetMapping("/book/getUser/{userId}")
    public List<BookingModel> findByUserId(@PathVariable int userId);
}
