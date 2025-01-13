/*
package com.example.demo.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Users;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Get all users
    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // Create a new user
    @PostMapping
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    // Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable int id, @RequestBody Users user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
*/


package com.app.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.app.user.config.NotFoundException;
import com.app.user.model.UserModelDTO;
import com.app.user.model.UserModel;
import com.app.user.service.ServicesByUser;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer")
public class UserController {
	
	@Autowired
	private ServicesByUser userService;
	

	

	@PostMapping
	public UserModel create(@RequestBody UserModel user) {
		this.userService.createUser(user);
		return user;
	}
	

	@PutMapping("/{id}")
	public UserModel update(@PathVariable("id") int id, @RequestBody UserModel user) {
		this.userService.updateUser(id, user);
		return user;
	}
	
	@DeleteMapping("/{id}")
	public UserModel delete(@PathVariable("id") int id) {
		UserModel user = this.userService.deleteUser(id);
		return user;
	}
	

	@GetMapping
	public List<UserModel> get(){
		return this.userService.getUsers();
	}
	

	@GetMapping("/{id}")
	public UserModel get(@PathVariable("id") int id) {
		UserModel user = this.userService.getUserById(id);
		return user;
	}
	
	@GetMapping("/user/booking/{id}")
	public UserModelDTO getBookings(@PathVariable("id") int id){
		return this.userService.getBookings(id);
	}
	
	
	// getByIdAndPassword
	@PostMapping("/login")
	public UserModel get(@RequestBody UserModel user) {
		return this.userService.getUser(user);
	}
	
}
