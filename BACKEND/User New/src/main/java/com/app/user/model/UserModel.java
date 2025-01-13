package com.app.user.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserModel {
    @Id		
//    @GeneratedValue(strategy = GenerationType.AUTO)		
    private int id;
	private String username;
	private String password;
	private String email;
	private String contact;
	private String address;
	
	public int getId() {
        return id;
    }
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getEmail() {
		return email;
	}
	public String getContact() {
		return contact;
	}
	public String getAddress() {
		return address;
	}
	
    public void setId(int id) {
        this.id = id;
    }
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public UserModel() {}
	
	public UserModel(String username, String email, String password, String address, String contact) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.address = address;
		this.contact = contact;
	}

	public UserModel(int id, String password) {
		this.id = id;
		this.password = password;
	}
	
	
	@Override
	public String toString() {
		return "Users Details [User Name=" + username + ", User Email=" + email + ", User Password=" + password + ", User Address=" + address
		+ ", User Contact=" + contact + "]";
	}
}
