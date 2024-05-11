package com.paper.demo.paper.service;

import com.paper.demo.paper.domain.Page;
import com.paper.demo.paper.domain.PaperDto;

import reactor.core.publisher.Mono;

public interface IPageServiceV1 {
	Mono<String> getUserYn(String accessToken);
	String getUserEmail();
	void createPage(PaperDto.createPage createPage,String accessToken);
	boolean validateTitle(String accessToken);

}
