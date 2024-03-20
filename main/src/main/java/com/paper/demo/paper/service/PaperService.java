package com.paper.demo.paper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paper.demo.auth.service.SecurityService;
import com.paper.demo.paper.repository.PaperRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaperService implements IPaperServiceV1{
	@Autowired
	private final PaperRepository paperRepository;

	private final SecurityService securityService;

	// public void createPaper(PaperDto.PaperCreateDto paperCreateDto) {
	// 	String UserEmail = securityService.getUserEmail();
	// 	//토큰의 정보를 이용하여 사용자 정보를 가져와야함
	// 	PaperUser paperUser = PaperUser.builder()
	// 		.email(UserEmail)
	// 		.name("test")
	// 		.build();
	// 	Paper paper = new Paper();
	// 	paper.setTitle(paperCreateDto.getTitle());
	// 	paper.setContent(paperCreateDto.getContent());
	// 	paper.setAuthor(paperUser);
	// 	paperRepository.save(paperUser);
	}

