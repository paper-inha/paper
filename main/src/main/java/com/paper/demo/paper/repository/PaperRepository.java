package com.paper.demo.paper.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.paper.demo.paper.domain.Paper;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {
	List<Paper> findByAuthorEmail(String author_email);

}
