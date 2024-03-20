package com.paper.demo.paper.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor( access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "papers")
public class Paper {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "paper_id")
	private Long id;
	private String title;
	private String content;
	// 사용자 엔티티와의 연관 관계 정의
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private PaperUser author;
	private String authorEmail;
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

}
