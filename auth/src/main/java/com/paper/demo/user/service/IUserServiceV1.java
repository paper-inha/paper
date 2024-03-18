package com.paper.demo.user.service;

import com.paper.demo.auth.service.dto.AuthDto;
import com.paper.demo.common.admin.AdminException;

public interface IUserServiceV1 {

	void registerUser(AuthDto.SignupDto signupDto );
	void checkPasswordCompatibility(String password) throws AdminException;
}
