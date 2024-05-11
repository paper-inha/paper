package com.paper.demo.paper.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paper.demo.common.ResponseStatus;
import com.paper.demo.common.SuccessResponse;
import com.paper.demo.paper.domain.PaperDto;
import com.paper.demo.paper.service.PageService;
import com.paper.demo.paper.service.PaperService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PageController implements IPageControllerV1 {
	private final PageService pageService;
	private final PaperService paperService;

	@Override
	public boolean validateTitle(@RequestHeader("Authorization") String accessToken) {
		return pageService.validateTitle(accessToken);
	}
	/**
	 * 페이지를 생성하는 메서드
	 * @param accessToken
	 * @param createPage
	 * @return
	 */
	@Override
	public ResponseEntity<?> createPage(@RequestHeader("Authorization") String accessToken,
		@RequestBody PaperDto.createPage createPage) {
		pageService.createPage(createPage, accessToken);
		SuccessResponse<?> successResponse = SuccessResponse.from(ResponseStatus.SUCCESS,null);
		return ResponseEntity
			.status(ResponseStatus.SUCCESS.getCode())
			.body(successResponse);
	}
	/**
	 * 페이퍼를 만드는 메서드
	 * @param accessToken
	 * @param createPaper
	 * @return
	 */
	@Override
	public ResponseEntity<?> createPaper(@RequestHeader("Authorization") String accessToken,
		@RequestBody PaperDto.createPaper createPaper) {
		paperService.createPapers(createPaper, accessToken);
		SuccessResponse<?> successResponse = SuccessResponse.from(ResponseStatus.SUCCESS, null);
		return ResponseEntity
			.status(ResponseStatus.SUCCESS.getCode())
			.body(successResponse);
	}
	/**
	 * 페이퍼 리스트를 조회하는 메서드
	 * @param accessToken
	 * @return
	 */
	@Override
	public ResponseEntity<?> getPaperList(@RequestHeader("Authorization") String accessToken) {
		SuccessResponse<?> successResponse = SuccessResponse.from(ResponseStatus.SUCCESS,
			paperService.getPaperList(accessToken));
		return ResponseEntity.ok().body(successResponse);
	}

	/**
	 * 페이퍼를 삭제하는 메서드
	 * @param paperId
	 * @param accessToken
	 * @return
	 */
	@Override
	public ResponseEntity<?> deletePaper(Long paperId, @RequestHeader("Authorization") String accessToken){
		paperService.deletePage(paperId);
		SuccessResponse<?> successResponse = SuccessResponse.from(ResponseStatus.SUCCESS, null);
		return ResponseEntity.status(ResponseStatus.SUCCESS.getCode()).body(successResponse);
	}
	@Override
	public ResponseEntity<?> getUserEmail(@RequestHeader("Authorization") String accessToken) {
		SuccessResponse<?> successResponse = SuccessResponse.from(ResponseStatus.SUCCESS, pageService.getUserEmail());
		return ResponseEntity.ok().body(successResponse);
	}

}
