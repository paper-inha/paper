package com.paper.demo.user.oauth;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.paper.demo.auth.jwt.JwtTokenProvider;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

	private final JwtTokenProvider jwtTokenProvider;
	private static final String URI = "/auth/success";

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		HttpSession session = request.getSession();
		String accessToken = (String) session.getAttribute("accessToken");
		String refreshToken = (String) session.getAttribute("refreshToken");

		if (accessToken != null && refreshToken != null) {
			// 액세스 토큰을 HTTP 헤더에 추가
			response.setHeader("Authorization", "Bearer " + accessToken);
			// 리프레시 토큰을 HttpOnly 쿠키에 추가
			addRefreshTokenInCookie(refreshToken, request, response);
		}
		// 필요한 경우 리다이렉트
		response.sendRedirect("http://localhost:3000/title");
	}
	private void addRefreshTokenInCookie(String refreshToken, HttpServletRequest request, HttpServletResponse response) {
		Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 쿠키 유효기간 1주일
		response.addCookie(refreshTokenCookie);
	}

}
