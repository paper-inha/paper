package com.paper.demo.swagger;

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
				.title("롤링페이퍼 프로젝트 API")
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
	// @Bean
	// public Docket api() {
	// 	return new Docket(DocumentationType.SWAGGER_2)
	// 		.securityContexts(Arrays.asList(securityContext()))//spring security 권한 관련
	// 		.securitySchemes(Arrays.asList(apiKey())) //spring security 권한 관련
	// 		.select()
	// 		//swagger 대상 패키지 설정
	// 		//                .apis(RequestHandlerSelectors.any())
	// 		.apis(RequestHandlerSelectors.basePackage("com.leesh.springbootjwttutorial.controller"))
	// 		.paths(PathSelectors.any())
	// 		.build()
	// 		.apiInfo(apiInfo());
	// }
	//
	// private ApiInfo apiInfo() {
	// 	return new ApiInfoBuilder()
	// 		.title("JWT인증,주문API")
	// 		.description("JWT인증,주문API 입니다.")
	// 		.version("1.0.0")
	// 		.termsOfServiceUrl("")
	// 		.license("LICENSE")
	// 		.licenseUrl("")
	// 		.build();
	// }
	//
	// private ApiKey apiKey() {
	// 	//2번째 인자값인 keyname 은 로그인 시 header에 토큰이 저장되는 keyname 으로 설정해줘야 한다.
	// 	return new ApiKey("JWT", "Authorization", "header");
	// }
	//
	// private springfox.documentation.spi.service.contexts.SecurityContext securityContext() {
	// 	return springfox.documentation.spi.service.contexts.SecurityContext
	// 		.builder() .securityReferences(defaultAuth())
	// 		.forPaths(PathSelectors.any())
	// 		.build();
	// }
	//
	// List<SecurityReference> defaultAuth() {
	// 	AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
	// 	AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
	// 	authorizationScopes[0] = authorizationScope;
	// 	return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
	// }

