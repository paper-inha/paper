package com.paper.demo.paper.service;

import org.springframework.http.ResponseEntity;

import com.paper.demo.paper.domain.PaperDto;

import reactor.core.publisher.Mono;

public interface IPaperServiceV1 {

	Mono<String> getUserYn(String accessToken);

	Mono<ResponseEntity<?>> getPaper(PaperDto.createPaperByUserDto createPaperByUserDto,String accessToken);
	Mono<ResponseEntity<?>> createPapers(PaperDto.createPaperByPaperDto createPaperByPaperDto,String accessToken);

	String getUserEmail();
}
