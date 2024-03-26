package com.paper.demo.paper.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.paper.demo.paper.domain.PaperUser;

@Repository
public interface PaperUserRepository extends JpaRepository<PaperUser, Long> {
	PaperUser findByEmail(String email);

}
