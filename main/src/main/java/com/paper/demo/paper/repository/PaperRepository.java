package com.paper.demo.paper.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.paper.demo.paper.domain.Paper;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {

}
