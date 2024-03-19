package com.paper.demo.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.paper.demo.auth.domain.UserDto;

import reactor.core.publisher.Mono;

public interface ISecurityControllerV1 {

	@GetMapping("/v1/name")
	String getName();

	@GetMapping("/v1/logout")
	Mono<ResponseEntity<?>> logout(@RequestHeader("Authorization") String accessToken);
	@GetMapping("/v1/login")
	Mono<ResponseEntity<?>> login(@RequestBody UserDto.RequestUserDto requestUserDto);
}
