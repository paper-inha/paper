package com.paper.demo.commom;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.paper.demo.common.ResponseStatus;

import lombok.Getter;

@Getter
@JsonPropertyOrder({"timestamp", "isSuccess", "code", "message"})
public class FailureResponse {
	private final LocalDateTime timestamp;
	@JsonProperty("isSuccess")
	private final Boolean isSuccess;
	private final int code;
	private final String message;

	private FailureResponse(ResponseStatus status) {
		this.timestamp = LocalDateTime.now();
		this.isSuccess = status.isSuccess();
		this.message = status.getMessage();
		this.code = status.getCode();
	}


	public static FailureResponse from(ResponseStatus status) {
		return new FailureResponse(status);
	}
}
