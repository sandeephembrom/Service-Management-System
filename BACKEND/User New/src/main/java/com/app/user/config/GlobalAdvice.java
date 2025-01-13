package com.app.user.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
//import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalAdvice {
	
	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<Map<String, String>> notFound (NotFoundException e) {
		Map<String, String> output = new HashMap<>();
		output.put("data", e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(output);
	}
}
