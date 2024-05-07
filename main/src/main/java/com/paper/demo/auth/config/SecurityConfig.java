package com.paper.demo.auth.config;

import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig  {
	/**
	 * @apiNote 인증서버에서 발급한 엑세스토큼을 이용하여 인증을 처리한다.
	 * @param http
	 * @return
	 * @throws Exception
	 */
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.csrf(AbstractHttpConfigurer::disable)
			.cors(AbstractHttpConfigurer::disable)
			.authorizeHttpRequests(registry -> registry
				.requestMatchers("/v**/auth/**","/v**/validate/**").permitAll()
				.requestMatchers("/swagger", "/swagger-ui.html", "/swagger-ui/**", "/api-docs", "/api-docs/**", "/v3/api-docs/**").permitAll()
				.requestMatchers("/v**/paper/**").hasRole("USER")
				.anyRequest().permitAll())
			.oauth2ResourceServer(oauth2ResourceServer ->
				oauth2ResourceServer.jwt(jwt ->
					jwt.jwtAuthenticationConverter(adminConverter())))
			.sessionManagement(sessionManagementConfigurer ->
				sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		return http.build();
	}
	private Converter<Jwt, JwtAuthenticationToken> adminConverter() {
		return jwt -> {
			String authority = jwt.getClaimAsString("roles");
			List<GrantedAuthority> grantedAuthorities = Collections.singletonList(
				new SimpleGrantedAuthority(authority));
			return new JwtAuthenticationToken(jwt, grantedAuthorities);
		};
	}

}
