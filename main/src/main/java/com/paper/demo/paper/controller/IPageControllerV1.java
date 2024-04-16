package com.paper.demo.paper.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.paper.demo.paper.domain.PaperDto;
@Tag(name = "롤링페이퍼 API", description = "롤링페이퍼 API")
public interface IPageControllerV1 {
	/**
	 * 페이지 생성
	 * @param accessToken
	 * @param createPage
	 * @return
	 */
	@Operation(
		summary = "페이지 생성",
		description = "페이지를 생성합니다.",
			responses = {
				@ApiResponse(responseCode = "200", description = "페이지 생성 성공"),
				@ApiResponse(responseCode = "400", description = "페이지 생성 실패")
			}
	)
	@GetMapping("/v1/page")
	ResponseEntity<?> createPage(@RequestHeader("Authorization") String accessToken,
		@RequestBody PaperDto.createPage createPage);
	/**
	 * 페이퍼 생성
	 * @param accessToken
	 * @param createPaper
	 * @return
	 */
	@Operation(
		summary = "페이퍼 생성",
		description = "페이퍼를 생성합니다.",
			responses = {
					@ApiResponse(responseCode = "200", description = "페이퍼 생성 성공"),
					@ApiResponse(responseCode = "400", description = "페이퍼 생성")
			}
	)
	@GetMapping("/v1/paper")
	ResponseEntity<?> createPaper(@RequestHeader("Authorization") String accessToken, @RequestBody  PaperDto.createPaper createPaper);
	/**
	 * 페이퍼 리스트 조회
	 * @param accessToken
	 * @return
	 */
	@Operation(
		summary = "페이퍼 리스트 조회",
		description = "페이퍼 리스트를 조회합니다.",
			responses = {
					@ApiResponse(responseCode = "200", description = "페이퍼 리스트 조회 성공"),
					@ApiResponse(responseCode = "400", description = "페이퍼 리스트 조회 실패")
			}
	)
	@GetMapping("/v1/")
	ResponseEntity<?> getPaperList(@RequestHeader("Authorization") String accessToken);
	/**
	 * 페이퍼 삭제
	 * @param paperId
	 * @param accessToken
	 * @return
	 */
	@Operation(
		summary = "페이퍼 삭제",
		description = "페이퍼를 삭제합니다.",
			responses = {
					@ApiResponse(responseCode = "200", description = "페이퍼 삭제 성공"),
					@ApiResponse(responseCode = "400", description = "페이퍼 삭제 실패")
			}
	)
	@PostMapping("/v1/page/{paperId}")
	ResponseEntity<?> deletePaper(@PathVariable Long paperId, @RequestHeader("Authorization") String accessToken);

}
