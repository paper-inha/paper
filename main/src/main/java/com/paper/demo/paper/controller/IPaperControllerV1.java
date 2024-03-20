package com.paper.demo.paper.controller;

import org.springframework.web.bind.annotation.GetMapping;

public interface IPaperControllerV1 {

	//로그인 사용자별 페이퍼 생성 메서드
	@GetMapping("/v1/paper/create")
	void createPaper();
	@GetMapping("/v1/paper/userinfo")
	String UserInfo();
	//생성된 페이퍼 글쓰기 메서드

	//생성된 페이퍼

}
