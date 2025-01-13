package com.app.Book.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name="Bookings")
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
    
    private int bookingId;
    private int userId;
    private String username;
    private LocalDate date; // Booking date
    private String service; // Type of service booked
    private String subService; // Type of sub service booked
    private String vendor;
    private String amount;
    private String status = "Booked";
    
	public int getBookingId() {
		return bookingId;
	}
	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	
	public String getService() {
		return service;
	}
	public void setService(String service) {
		this.service = service;
	}
	public String getSubService() {
		return subService;
	}
	public void setSubService(String subService) {
		this.subService = subService;
	}
	public String getVendor() {
		return vendor;
	}
	public void setVendor(String vendor) {
		this.vendor = vendor;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Bookings() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Bookings(int bookingId, int userId, String username, LocalDate date, String service, String subService,
			String vendor, String amount, String status) {
		super();
		this.bookingId = bookingId;
		this.userId = userId;
		this.username = username;
		this.date = date;
		this.service = service;
		this.subService = subService;
		this.vendor = vendor;
		this.amount = amount;
		this.status = status;
	}
	@Override
	public String toString() {
		return "Bookings [bookingId=" + bookingId + ", userId=" + userId + ", username=" + username + ", date=" + date
				+ ", service=" + service + ", subService=" + subService + ", vendor=" + vendor + ", amount=" + amount
				+ ", status=" + status + "]";
	}
	
	
	
}
