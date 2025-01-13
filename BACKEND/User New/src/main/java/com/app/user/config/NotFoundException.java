package com.app.user.config;

import org.springframework.web.bind.annotation.RestControllerAdvice;

@SuppressWarnings("serial")
@RestControllerAdvice
public class NotFoundException extends RuntimeException {
	public NotFoundException() {}
	
	public NotFoundException(String message) {
		super(message);
	}
}
