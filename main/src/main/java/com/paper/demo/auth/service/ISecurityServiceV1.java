package com.paper.demo.auth.service;

import org.springframework.http.ResponseEntity;

import com.paper.demo.auth.domain.UserDto;

import reactor.core.publisher.Mono;

public interface ISecurityServiceV1{

	String getUserEmail();

	Mono<ResponseEntity<?>> logout(String accessToken);
	Mono<ResponseEntity<?>> login(UserDto.RequestUserDto requestUserDto);
}
