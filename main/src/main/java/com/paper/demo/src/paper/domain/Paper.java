package com.paper.demo.src.paper.domain;

import com.paper.demo.src.user.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "papers")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Paper {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "paper_id")
	private Long id;
	private String title;
	private String content;
	private String author;
	private String createdDate;
	private String updatedDate;
	private String deletedDate;
	private String deletedYn;

	// == 생성 메서드 == //

	/**
	 * @apiNote Paper를 생성한다.
	 * @param title
	 * @param content
	 * @param user
	 * @return
	 */
	public static Paper writePaper(String title, String content, User user) {
		Paper paper = new Paper();
		paper.title = title;
		paper.content = content;
		paper.author = user.getEmail();
		return paper;
	}
}
