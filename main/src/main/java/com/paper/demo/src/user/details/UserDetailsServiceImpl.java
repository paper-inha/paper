package com.paper.demo.src.user.details;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.paper.demo.src.user.domain.User;
import com.paper.demo.src.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetailsImpl loadUserByUsername(String email) throws UsernameNotFoundException {
		User findUser = userRepository.findByEmail(email)
			.orElseThrow(() -> new UsernameNotFoundException("이메일 못 찾겠음 -> " + email));

		if (findUser != null) {
			System.out.println("findUser가 있음 : " + findUser);
			return new UserDetailsImpl(findUser);
		}
		return null;
	}
}
