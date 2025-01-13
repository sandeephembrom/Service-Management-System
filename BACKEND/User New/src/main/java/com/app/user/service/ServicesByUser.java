
package com.app.user.service;

import java.util.List;
import com.app.user.config.NotFoundException;
import com.app.user.repo.UserRepo;
import com.app.user.model.UserModel;
import com.app.user.model.BookingModel;
import com.app.user.model.UserModelDTO;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ServicesByUser {
	
	@Autowired		
	private UserRepo userRepository;
	@Autowired
	private UserServiceBook bookingService;
	
	// Creating User Id (Random Generated)
    public UserModel registerUser(UserModel user) {
        // Save the user to generate a sequential ID
        UserModel existingUser = userRepository.save(user);

        // Return the saved user (with auto-generated ID)
        return existingUser;
    }
	
	// creating new user
	public UserModel createUser(UserModel user) {
		this.userRepository.save(user);
		return user;
	}
	
	// get user by id
	public UserModel getUserById(int id) {
		return this.userRepository
				.findById(id)
				.orElseThrow(() -> new NotFoundException("Please check the ID"));
	}
	
	// update
	public UserModel updateUser(int id, UserModel updatedUser) {
		UserModel existingUser = getUserById(id);
		existingUser.setUsername(updatedUser.getUsername());
		existingUser.setEmail(updatedUser.getEmail());
		existingUser.setPassword(updatedUser.getPassword());
		existingUser.setAddress(updatedUser.getAddress());
		existingUser.setContact(updatedUser.getContact());
		
		userRepository.save(existingUser);
		return existingUser;
	}
	
	// delete
	public UserModel deleteUser(int id) {
		UserModel existingUser = getUserById(id);
		userRepository.delete(existingUser);
		return existingUser;
	}
	
	// Fetching All Users Data
	public List<UserModel> getUsers(){
		return this.userRepository.findAll();
	}
		
	public UserModelDTO getBookings(int id) {
		UserModel userBooking = this.userRepository
				.findById(id)
				.orElseThrow(() -> new NotFoundException("Please check the ID"));
		List<BookingModel> bookings = this.bookingService.findByUserId(id);
		UserModelDTO userDTO = new UserModelDTO(userBooking.getId(),userBooking.getUsername(),userBooking.getEmail(),userBooking.getPassword(),userBooking.getAddress(),userBooking.getContact());
		userDTO.setBookings(bookings);
		return userDTO;
	}
	
	// findByIdAndPassword
	public UserModel getUser(UserModel existingUser) {
		return this.userRepository
				.findByIdAndPassword(existingUser.getId(), existingUser.getPassword())
				.orElseThrow(() -> new NotFoundException("Wrong Credentials."));
	}
	
}
