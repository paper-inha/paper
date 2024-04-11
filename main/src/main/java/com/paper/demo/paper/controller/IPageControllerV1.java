package com.paper.demo.paper.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.paper.demo.paper.domain.PaperDto;

public interface IPageControllerV1 {

	@GetMapping("/v1/page")
	ResponseEntity<?> createPage(@RequestHeader("Authorization") String accessToken,
		@RequestBody PaperDto.createPage createPage);
	@GetMapping("/v1/paper")
	ResponseEntity<?> createPaper(@RequestHeader("Authorization") String accessToken, @RequestBody  PaperDto.createPaper createPaper);
	@GetMapping("/v1/")
	ResponseEntity<?> getPaperList(@RequestHeader("Authorization") String accessToken);
	@PostMapping("/v1/page/{paperId}")
	ResponseEntity<?> deletePaper(@PathVariable Long paperId, @RequestHeader("Authorization") String accessToken);

}
