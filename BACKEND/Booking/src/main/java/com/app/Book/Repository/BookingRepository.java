package com.app.Book.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.Book.Model.Bookings;

@Repository
public interface BookingRepository extends JpaRepository<Bookings, Integer> {
	public Optional<List<Bookings>> findByUserId(int id);
}
