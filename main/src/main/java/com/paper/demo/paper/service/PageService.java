package com.paper.demo.paper.service;

import static org.springframework.util.ClassUtils.*;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.paper.demo.auth.domain.JsonResponse;
import com.paper.demo.auth.service.SecurityService;
import com.paper.demo.paper.domain.Page;
import com.paper.demo.paper.domain.PaperDto;
import com.paper.demo.paper.repository.PageRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;


@Service
@Slf4j
@RequiredArgsConstructor
public class PageService implements IPageServiceV1 {
	private final SecurityService securityService;
	private final PageRepository pageRepository;

	/**
	 * 페이지 타이틀 유효성 검사
	 * @param accessToken
	 * @return
	 */
	public boolean validateTitle(String accessToken) {
		String email = getUserEmail(); // 현재 사용자의 이메일을 얻습니다.
		String loginType = getLoginType(accessToken); // 현재 사용자의 로그인 타입을 얻습니다.
		System.out.println("validateTitle : getUserEmail() : " + email);
		System.out.println("validateTitle : getLoginType() : " + loginType);
		Optional<Page> optionalPage = pageRepository.findByEmailAndLoginType(email, loginType);
		return optionalPage.isPresent();
	}
	/**
	 * 유저 정보 조회
	 * @param accessToken
	 * @return
	 */
	@Override
	public Mono<String> getUserYn(String accessToken) {
		return securityService.validateToken(accessToken)
			.map(responseEntity -> {
				JsonResponse jsonResponse = (JsonResponse)responseEntity.getBody();
				if (jsonResponse != null) {
					if (jsonResponse.getCode() == 200) {
						return "yes";
					}
				}
				return "no";
			});
	}


	/**
	 * 페이지 생성
	 * @param createPage
	 * @param accessToken
	 */
	@Transactional
	@Override
	public void createPage(PaperDto.createPage createPage,String accessToken) {
		if (Boolean.TRUE.equals(getUserYn(accessToken).map(yn -> yn.equals("yes")).block())){
			Page buildPage = Page.builder()
				.email(getUserEmail())
				.title(createPage.getTitle())
				.loginType(getLoginType(accessToken))
				.build();
			pageRepository.save(buildPage);
			log.info("페이지 생성 완료");
		} else {
			throw new RuntimeException("페이지 생성 실패");
		}
	}
	/**
	 * 유저 이메일 조회
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

	@Override
	public String getLoginType(String accessToken) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !(authentication.getPrincipal() instanceof Jwt jwt)) {
			throw new RuntimeException("인증정보가 없거나 잘못된 토큰정보 입니다.");
		}
		return (String) jwt.getClaims().get("loginType");
	}

}
