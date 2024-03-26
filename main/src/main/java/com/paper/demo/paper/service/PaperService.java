package com.paper.demo.paper.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.paper.demo.auth.domain.JsonResponse;
import com.paper.demo.auth.service.SecurityService;
import com.paper.demo.paper.domain.Paper;
import com.paper.demo.paper.domain.PaperDto;
import com.paper.demo.paper.domain.PaperUser;
import com.paper.demo.paper.repository.PaperRepository;
import com.paper.demo.paper.repository.PaperUserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaperService implements IPaperServiceV1 {
	private final PaperRepository paperRepository;

	private final PaperUserRepository paperUserRepository;
	private final SecurityService securityService;

	@Override
	public Mono<String> getUserYn(String accessToken) {
		return securityService.validateToken(accessToken)
			.map(responseEntity -> {
				JsonResponse jsonResponse = (JsonResponse)responseEntity.getBody();
				if (jsonResponse != null) {
					// 응답 코드가 200이고, success 필드가 true일 경우 "yes" 반환
					if (jsonResponse.getCode() == 200) {
						return "yes";
					}
				}
				// 다른 조건을 만족하지 않을 때 null이나 다른 문자열 반환
				return "no";
			});
	}

	@Override
	public Mono<ResponseEntity<?>> getPaper(PaperDto.createPaperByUserDto createPaperByUserDto,String accessToken) {
		// TODO Auto-generated method stub
		PaperUser paperUser = PaperUser.builder()
			.email(securityService.getUserEmail())
			.title(createPaperByUserDto.getTitle())
			.build();
		return getUserYn(accessToken).flatMap(isValid -> {
			if (isValid.equals("yes")) {
				paperUserRepository.save(paperUser);
				return Mono.just(ResponseEntity.ok().body("페이퍼가 성공적으로 생성되었습니다."));
			} else {
				// 토큰이 유효하지 않은 경우, 에러 메시지 반환
				return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다."));
			}
		});
	}

	/*
	이 메서드는 PaperRepository를 사용하여 사용자 ID로 Paper 엔티티를 조회하는 메서드입니다.
	 */
	@Override
	public Mono<ResponseEntity<?>> createPapers(PaperDto.createPaperByPaperDto createPaperByPaperDto,String accessToken) {
		Paper paper = Paper.builder()
			.deletedYn("N")
			.content(createPaperByPaperDto.getContent())
			.author(paperUserRepository.findByEmail(getUserEmail()))
			.build();
		return getUserYn(accessToken).flatMap(isValid -> {
			if (isValid.equals("yes")) {
				paperRepository.save(paper);
				return Mono.just(ResponseEntity.ok().body("성공"));
			}else{
				return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다."));
			}
		});
	}

	@Override
	public String getUserEmail() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !(authentication.getPrincipal() instanceof Jwt jwt)) {
			throw new RuntimeException("인증정보가 없거나 잘못된 토큰정보 입니다.");
		}
		return (String) jwt.getClaims().get("email");
	}

}


