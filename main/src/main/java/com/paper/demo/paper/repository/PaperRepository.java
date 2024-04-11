package com.paper.demo.paper.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.paper.demo.paper.domain.Paper;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {
	List<Paper> findByAuthorEmail(String author_email);

	Paper deletePageById(Long paperId);

	@Query("SELECT p.content FROM Paper p WHERE p.author.email = :email AND p.deletedYn <> 'y'")
	List<String> getPaperList(@Param("email") String email);

	@Modifying
	@Query("UPDATE Paper p SET p.deletedYn= 'Y' WHERE p.id = :paperId")
	void deletePaper(@Param("paperId")Long paperId);
}
