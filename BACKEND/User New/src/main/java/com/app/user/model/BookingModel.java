package com.app.user.model;

import java.time.LocalDate;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class BookingModel {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
    
    private int id;
    private int userId;
    private String username;
    private LocalDate date; // Booking date
    private String service; // Type of service booked
    private String subService; // Type of sub service booked
    private String vendor;
    private String amount;
    private String status = "Booked";
    
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public BookingModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BookingModel(int id, int userId, String username, LocalDate date, String service, String subService,
			String vendor, String amount, String status) {
		super();
		this.id = id;
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
		return "BookingModel [id=" + id + ", userId=" + userId + ", username=" + username + ", date=" + date
				+ ", service=" + service + ", subService=" + subService + ", vendor=" + vendor + ", amount=" + amount
				+ ", status=" + status + "]";
	}
	
}
