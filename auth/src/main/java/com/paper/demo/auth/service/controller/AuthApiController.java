package com.paper.demo.auth.service.controller;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.paper.demo.auth.service.dto.AuthDto;
import com.paper.demo.auth.service.service.AuthService;
import com.paper.demo.user.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthApiController implements IAuthApiControllerV1 {

	private final AuthService authService;
	private final UserService userService;
	private final BCryptPasswordEncoder encoder;

	private final long COOKIE_EXPIRATION = 7776000; // 90일

	// 회원가입
	public ResponseEntity<String> signupUser(@RequestBody @Valid AuthDto.SignupDto signupDto) {
		userService.registerUser(signupDto);
		// HttpStatus.OK와 함께 메시지를 본문에 포함하여 응답 생성
		String successMessage = "회원가입에 성공하였습니다.";
		return ResponseEntity.ok(successMessage);
	}
	public ResponseEntity<String> signupAdmin(@RequestBody @Valid AuthDto.SignupDto signupDto) {
		userService.registerAdmin(signupDto);
		// HttpStatus.OK와 함께 메시지를 본문에 포함하여 응답 생성
		String successMessage = "관리자 회원가입에 성공하였습니다.";
		return ResponseEntity.ok(successMessage);
	}


	// 로그인 -> 토큰 발급
	public ResponseEntity<?> login(@RequestBody @Valid AuthDto.LoginDto loginDto) throws
		NoSuchAlgorithmException,
		InvalidKeySpecException {
		// User 등록 및 Refresh Token 저장
		AuthDto.TokenDto tokenDto = authService.login(loginDto);

		// RT 저장
		HttpCookie httpCookie = ResponseCookie.from("refresh-token", tokenDto.getRefreshToken())
			.maxAge(COOKIE_EXPIRATION)
			.httpOnly(true)
			.secure(true)
			.build();
		Map<String, String> tokens = new HashMap<>();
		tokens.put("accessToken", tokenDto.getAccessToken());
		tokens.put("refreshToken", tokenDto.getRefreshToken());

		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, httpCookie.toString())
			// AT 저장
			.header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccessToken())
			.body(tokens);
		// .build();
	}

	public ResponseEntity<?> validate(@RequestHeader("Authorization") String requestAccessToken) {
		if (!authService.validate(requestAccessToken)) {
			return ResponseEntity.status(HttpStatus.OK).build(); // 재발급 필요X
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 재발급 필요
		}
	}

	// 토큰 재발급
	public ResponseEntity<?> reissue(@CookieValue(name = "refresh-token") String requestRefreshToken,
		@RequestHeader("Authorization") String requestAccessToken) throws
		NoSuchAlgorithmException,
		InvalidKeySpecException {
		AuthDto.TokenDto reissuedTokenDto = authService.reissue(requestAccessToken, requestRefreshToken);
		System.out.println("reissuedTokenDto : " + reissuedTokenDto);
		if (reissuedTokenDto != null) { // 토큰 재발급 성공
			System.out.println("토큰 재발급 성공");
			// RT 저장
			ResponseCookie responseCookie = ResponseCookie.from("refresh-token", reissuedTokenDto.getRefreshToken())
				.maxAge(COOKIE_EXPIRATION)
				.httpOnly(true)
				.secure(true)
				.build();
			Map<String, String> tokens = new HashMap<>();
			tokens.put("accessToken", reissuedTokenDto.getAccessToken());
			tokens.put("refreshToken", reissuedTokenDto.getRefreshToken());

			return ResponseEntity
				.status(HttpStatus.OK)
				.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
				// AT 저장
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + reissuedTokenDto.getAccessToken())
				.body(tokens);
			// .build();
		} else { // Refresh Token 탈취 가능성
			System.out.println("재로그인 하세요");
			// Cookie 삭제 후 재로그인 유도
			ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
				.maxAge(0)
				.path("/")
				.build();
			return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
				.build();
		}
	}

	// 로그아웃
	@PostMapping("/v1/logout")
	public ResponseEntity<?> logout(@RequestHeader("Authorization") String requestAccessToken) {
		authService.logout(requestAccessToken);
		ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
			.maxAge(0)
			.path("/")
			.build();
		return ResponseEntity
			.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
			.build();
	}
}
