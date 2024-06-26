package com.paper.demo.user.details;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.paper.demo.user.domain.User;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {

	private final User user;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(() -> user.getRole().getKey()); // key: ROLE_권한
		return authorities;
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	// == 세부 설정 == //

	@Override
	public boolean isAccountNonExpired() { // 계정의 만료 여부
		return true;
	}

	@Override
	public boolean isAccountNonLocked() { // 계정의 잠김 여부
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() { // 비밀번호 만료 여부
		return true;
	}

	@Override
	public boolean isEnabled() { // 계정의 활성화 여부
		return true;
	}
}
