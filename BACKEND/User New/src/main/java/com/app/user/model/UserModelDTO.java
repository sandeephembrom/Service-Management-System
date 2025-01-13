package com.app.user.model;

import java.util.List;

public class UserModelDTO {
	    private int id;
		private String username;
		private String email;
		private String password;
		private String address;
		private String contact;
		private List<BookingModel> bookings;
		
		//getters and setters
		public int getId() {
	        return id;
	    }
		public String getUsername() {
			return username;
		}
		public String getEmail() {
			return email;
		}
		public String getPassword() {
			return password;
		}
		public String getAddress() {
			return address;
		}
		public String getContact() {
			return contact;
		}
		
	    public void setId(int id) {
	        this.id = id;
	    }
		public void setUsername(String username) {
			this.username = username;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public void setContact(String contact) {
			this.contact = contact;
		}
	    public List<BookingModel> getBookings() {
			return bookings;
		}
		public void setBookings(List<BookingModel> bookings) {
			this.bookings = bookings;
		}
		
		//constructors
		public UserModelDTO() {}
		public UserModelDTO(int id, String password) {
			this.id = id;
			this.password = password;
		}
		public UserModelDTO(int id,String username, String email, String password, String address, String contact) {
			this.id=id;
			this.username = username;
			this.email = email;
			this.password = password;
			this.address = address;
			this.contact = contact;
		}
		
		@Override
		public String toString() {
			return "Users [username=" + username + ", email=" + email + ", password=" + password + ", address=" + address
					+ ", contact=" + contact + "]";
		}
		
		
}
