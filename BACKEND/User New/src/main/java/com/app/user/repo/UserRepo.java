/*
package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
}
*/

package com.app.user.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.user.model.UserModel;

@Repository
public interface UserRepo extends JpaRepository<UserModel, Integer>{
	
	//UserId and Password Validation
	public Optional<UserModel> findByIdAndPassword(int Id, String password);
	
	// Methods to check for existing fields
    public Optional<UserModel> findByUsername(String username);
    public Optional<UserModel> findByEmail(String email);
    public Optional<UserModel> findByContact(String contact);
    
}
