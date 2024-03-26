package com.paper.demo.paper.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PaperDto {

	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class PaperCreateDto{
		private String title;
		private String content;

		public PaperCreateDto(String title, String content) {
			this.title = title;
			this.content = content;
		}
	}
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class createPaperByPaperDto{
		private String content;
		public createPaperByPaperDto(String content) {
			this.content = content;
		}
	}


	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class createPaperByUserDto{
		private String email;
		private String title;

		public createPaperByUserDto(String email, String title) {
			this.email = email;
			this.title = title;
		}
	}

}
