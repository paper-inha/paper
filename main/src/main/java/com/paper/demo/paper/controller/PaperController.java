package com.paper.demo.paper.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.paper.demo.paper.domain.PaperDto;
import com.paper.demo.paper.service.PaperService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class PaperController implements  IPaperControllerV1{

	private final PaperService paperService;

	// @Override
	// public ResponseEntity<?> getPaper(@RequestBody @Valid PaperDto.createPaperByUserDto createPaperByUserDto) {
	// 	PaperUser paperUser = paperService.getPaper(createPaperByUserDto);
	// 	SuccessResponse<?> successResponse = SuccessResponse.from(ResponseStatus.SUCCESS,paperUser.getEmail());
	// 	return ResponseEntity
	// 		.status(ResponseStatus.SUCCESS.getCode())
	// 		.body(successResponse);
	// }
	@Override
	public Mono<ResponseEntity<?>> createPaper(@RequestHeader("Authorization") String accessToken,
		@RequestBody PaperDto.createPaperByUserDto createPaperByUserDto) {

		return paperService.getPaper(createPaperByUserDto, accessToken)
			.doOnSuccess(paper -> {
				System.out.println("Success: 페이퍼가 성공적으로 생성되었습니다.");
			})
			.doOnError(error -> {
				System.out.println("Error: 유효하지 않은 토큰입니다.");
			});
	}
	@Override
	public Mono<ResponseEntity<?>> createPapers(@RequestHeader("Authorization") String accessToken,
		@RequestBody PaperDto.createPaperByPaperDto createPaperByPaperDto) {
		return paperService.createPapers(createPaperByPaperDto, accessToken)
			.doOnSuccess(paper -> {
				System.out.println("Success: 페이퍼가 성공적으로 생성되었습니다.");
			})
			.doOnError(error -> {
				System.out.println("Error: 유효하지 않은 토큰입니다.");
			});
	}
}
