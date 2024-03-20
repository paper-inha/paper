package com.paper.demo.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.paper.demo.auth.domain.UserDto;

import jakarta.validation.Valid;
import reactor.core.publisher.Mono;

public interface ISecurityControllerV1 {

	@GetMapping("/v1/auth/name")
	String getName();

	@GetMapping("/v1/auth/logout")
	Mono<ResponseEntity<?>> logout(@RequestHeader("Authorization") String accessToken);
	@GetMapping("/v1/auth/login")
	Mono<ResponseEntity<?>> login(@RequestBody UserDto.LoginDto loginDto);

	@GetMapping("/v1/auth/signup")
	Mono<ResponseEntity<?>> signupUser(@RequestBody @Valid UserDto.SignUpDto signUpDto);
	// 관리자 회원가입
	@GetMapping("/v1/auth/signup/inha")
	Mono<ResponseEntity<?>> signupAdmin(@RequestBody @Valid UserDto.SignUpDto signUpDto);
}
