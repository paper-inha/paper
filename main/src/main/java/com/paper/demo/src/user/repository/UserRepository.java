package com.paper.demo.src.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paper.demo.src.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}
