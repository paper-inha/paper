package com.paper.demo.paper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.paper.demo.paper.service.PaperService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PaperController implements  IPaperControllerV1{
	@Autowired
	private final PaperService paperService;

	@Override
	public void createPaper() {
		// paperService
	}
	@Override
	public String UserInfo() {
		return paperService.UserInfo();
	}
}
