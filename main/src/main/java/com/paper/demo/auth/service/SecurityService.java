package com.paper.demo.auth.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.paper.demo.auth.domain.UserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class SecurityService implements ISecurityServiceV1{

	@Autowired
	private final WebClient webClient;

	/**
	 * @apiNote 현재 인증된 사용자의 이메일을 반환한다.
	 * @return
	 */
	@Override
	public String getUserEmail() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !(authentication.getPrincipal() instanceof Jwt jwt)) {
			throw new RuntimeException("인증정보가 없거나 잘못된 토큰정보 입니다.");
		}
		return (String) jwt.getClaims().get("email");
	}

	/**
	 * @apiNote 인증서버에 로그인 요청
	 * @param requestUserDto
	 * @return
	 */
	public Mono<ResponseEntity<?>> login(UserDto.RequestUserDto requestUserDto){
		return this.webClient.post()
			.uri("/v1/login") // 로그인 엔드포인트
			.bodyValue(requestUserDto) // 로그인 정보를 Map 객체로 전달
			.retrieve() // 서버로부터의 응답을 검색
			.toEntity(Map.class) // 응답을 Json으로 변환
			.map(response -> {
				// 응답 생성 및 반환
				return ResponseEntity
					.status(response.getStatusCode())
					.headers(response.getHeaders())
					.body(response.getBody());
			});
	}
	/**
	 * @apiNote 현재 인증된 사용자를 로그아웃 한다.
	 * @param accessToken
	 * @return
	 */
	public Mono<ResponseEntity<?>> logout(String accessToken) {
		return this.webClient.post()
			.uri("/v1/logout")
			.header(HttpHeaders.AUTHORIZATION, accessToken)
			.retrieve()
			.toEntity(String.class)
			.map(response -> ResponseEntity
				.status(response.getStatusCode())
				.headers(response.getHeaders())
				.body(response.getBody()));
	}
}
