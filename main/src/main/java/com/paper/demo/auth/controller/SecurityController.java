package com.paper.demo.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.paper.demo.auth.domain.UserDto;
import com.paper.demo.auth.service.SecurityService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class SecurityController implements ISecurityControllerV1{
	@Autowired
	private SecurityService securityService;

	@Override
	public String getName() {
		return securityService.getUserEmail();
	}


	@Override
	public Mono<ResponseEntity<?>> logout(@RequestHeader("Authorization") String accessToken) {
		return securityService.logout(accessToken);
	}

	@Override
	public Mono<ResponseEntity<?>> login(@RequestBody UserDto.RequestUserDto requestUserDto) {
		return securityService.login(requestUserDto);
	}
}
