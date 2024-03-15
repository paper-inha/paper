package com.paper.demo.src.paper.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.paper.demo.src.paper.domain.Paper;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {

}
