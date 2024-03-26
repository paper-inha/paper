package com.paper.demo.paper.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.paper.demo.paper.domain.PaperDto;

import reactor.core.publisher.Mono;

public interface IPaperControllerV1 {
	// @GetMapping("/v1/paperuser")
	// ResponseEntity<?> getPaper(PaperDto.createPaperByUserDto createPaperByUserDto);

	@GetMapping("/v1/paperuser")
	Mono<ResponseEntity<?>> createPaper(@RequestHeader("Authorization") String accessToken,
		@RequestBody PaperDto.createPaperByUserDto createPaperByUserDto);
	@GetMapping("/v1/papers")
	Mono<ResponseEntity<?>> createPapers(@RequestHeader("Authorization") String accessToken, @RequestBody  PaperDto.createPaperByPaperDto createPaperByPaperDto);


}
