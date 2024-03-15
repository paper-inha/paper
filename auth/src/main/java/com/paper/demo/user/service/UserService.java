package com.paper.demo.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.paper.demo.user.domain.Role;
import com.paper.demo.user.domain.User;
import com.paper.demo.auth.service.dto.AuthDto;
import com.paper.demo.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserServiceV1 {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public void registerAdmin(AuthDto.SignupDto signupDto) {
		//이메일 중복 체크
		checkDuplicatedEmail(signupDto.getEmail());
		//비밀번호 암호화
		String encodedPassword = passwordEncoder.encode(signupDto.getPassword());
		//로그 체크
		System.out.println("signupDto.getEmail() = " + signupDto.getEmail());

		User user = User.registerUser(signupDto.getEmail(), encodedPassword, Role.ADMIN);
		userRepository.save(user);
	}
	//비밀번호 호환성검사 ( 숫자 + 문자 + 특수문자 10자 이상 )
	public void checkPasswordCompatibility(String password) {
		if (!password.matches("^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{10,}$")) {
			throw new IllegalArgumentException("비밀번호는 숫자, 문자, 특수문자를 포함하여 10자 이상이어야 합니다.");
		}
	}
	public void registerUser(AuthDto.SignupDto signupDto) {
		//이메일 중복 체크
		checkDuplicatedEmail(signupDto.getEmail());
		//비밀번호 암호화
		String encodedPassword = passwordEncoder.encode(signupDto.getPassword());
		//로그 체크
		System.out.println("signupDto.getEmail() = " + signupDto.getEmail());
		User user = User.registerUser(signupDto.getEmail(), encodedPassword, Role.USER);
		userRepository.save(user);
	}
	/*
	* 이메일로 사용자 조회
	* 만약 이메일로 사용자가 있다면 예외를 발생시킨다.
	 */
	public void checkDuplicatedEmail(String email) {
		userRepository.findByEmail(email)
			.ifPresent(user -> {
				throw new IllegalArgumentException("일치하는 정보가 없습니다.");
			});
	}
}
