package com.paper.demo.paper.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.paper.demo.paper.domain.Page;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
	Page findByEmail(String email);
	Optional<Page> findByEmailAndLoginType(String email, String loginType);
}
