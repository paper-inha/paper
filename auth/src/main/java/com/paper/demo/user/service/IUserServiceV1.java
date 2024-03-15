package com.paper.demo.user.service;

import com.paper.demo.auth.service.dto.AuthDto;

public interface IUserServiceV1 {

	void registerUser(AuthDto.SignupDto signupDto);
}
