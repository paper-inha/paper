package com.paper.demo.configuration;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.paper.demo.auth.jwt.JwtAccessDeniedHandler;
import com.paper.demo.auth.jwt.JwtAuthenticationEntryPoint;
import com.paper.demo.auth.jwt.JwtAuthenticationFilter;
import com.paper.demo.auth.jwt.JwtTokenProvider;
import com.paper.demo.user.oauth.OAuth2SuccessHandler;
import com.paper.demo.user.oauth.service.CustomOAuth2UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtTokenProvider jwtTokenProvider;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	@Bean
	public BCryptPasswordEncoder encoder() {
		// 비밀번호를 DB에 저장하기 전 사용할 암호화
		return new BCryptPasswordEncoder();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() { // security를 적용하지 않을 리소스
		return web -> web.ignoring()
			// error endpoint를 열어줘야 함, favicon.ico 추가!
			.requestMatchers(PathRequest.toStaticResources().atCommonLocations())
			.requestMatchers("/error", "/favicon.ico");
	}
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// 인터셉터로 요청을 안전하게 보호하는 방법 설정
		// 리프래시 토큰은 애초에 토큰값을 넣는데 굳이 permitAll을 할 필요가 있을까?
		http.authorizeHttpRequests(authorize -> {
				authorize.requestMatchers("/swagger-ui/**","/v3/api-docs/**").permitAll();
				authorize.requestMatchers("v**/validate/**","/v**/login/**","/v**/signup/**","/auth/**","/v**/logout/**").permitAll();
				authorize.anyRequest().authenticated();
			})
			.sessionManagement(session -> {
				session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
			})
			.httpBasic(HttpBasicConfigurer::disable)
			.formLogin(AbstractHttpConfigurer::disable)
			.csrf(AbstractHttpConfigurer::disable)
			.cors(AbstractHttpConfigurer::disable)
			.oauth2Login(oauth2 -> oauth2.userInfoEndpoint(userInfo -> userInfo
					.userService(customOAuth2UserService))
				.successHandler(oAuth2SuccessHandler)
				.failureHandler((request, response, exception) -> {
						response.sendRedirect("http://localhost:3000/login");
					}
				)
			)
			// jwt 토큰 사용을 위한 설정
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
			// 예외 처리
			.exceptionHandling(exception -> {
				exception
					.accessDeniedHandler(jwtAccessDeniedHandler)
					.authenticationEntryPoint(jwtAuthenticationEntryPoint);
			})
			.headers(headers -> headers
				.contentSecurityPolicy(csp -> csp
					.policyDirectives("frame-ancestors 'self'")
				)
			);
		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws
		Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

}