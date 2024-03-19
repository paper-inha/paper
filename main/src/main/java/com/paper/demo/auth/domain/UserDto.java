package com.paper.demo.auth.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserDto {
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class RequestUserDto {
		private String email;
		private String password;
		@Builder
		public RequestUserDto(String email,String password) {
			this.email = email;
			this.password = password;
		}
	}
}
