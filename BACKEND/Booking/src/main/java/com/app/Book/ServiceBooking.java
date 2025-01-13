package com.app.Book;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ServiceBooking {

	public static void main(String[] args) {
		SpringApplication.run(ServiceBooking.class, args);
	}

}
