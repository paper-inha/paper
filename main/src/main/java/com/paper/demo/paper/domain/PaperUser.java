package com.paper.demo.paper.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "users")
public class PaperUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;
	private String email;
	private String title;
	// 사용자가 작성한 페이퍼들에 대한 연관 관계 정의
	@OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
	private List<Paper> papers = new ArrayList<>();

	// private PaperUser(PaperUserBuilder builder) {
	// 	this.email = builder.email;
	// 	this.title = builder.title;
	// }
	//
	// /**
	//  * PaperUserBuilder 클래스를 이용하여 PaperUser 객체를 생성하는 메소드
	//  */
	// public static class PaperUserBuilder implements CommonBuilder<PaperUser> {
	// 	private final String email;
	// 	private final String title;
	//
	// 	public PaperUserBuilder(PaperDto.createPaperByUserDto createPaperByUserDto) {
	// 		this.email = createPaperByUserDto.getEmail();
	// 		this.title = createPaperByUserDto.getEmail();
	// 	}
	//
	//
	// 	@Override
	// 	public PaperUser build() {
	// 		return new PaperUser(this);
	// 	}

	}


