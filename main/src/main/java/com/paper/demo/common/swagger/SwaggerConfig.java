package com.paper.demo.common.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.info(new Info()
				.title("롤링페이퍼 Main Server API")
				.description("하고싶은 말을 적고, 누군가에게 전달하세요.")
				.version("1.0.0"))
	.components(new Components()
			.addSecuritySchemes("bearer-key",
				new io.swagger.v3.oas.models.security.SecurityScheme()
					.type(SecurityScheme.Type.HTTP)
					.scheme("bearer")
					.bearerFormat("JWT")));
	}
}
