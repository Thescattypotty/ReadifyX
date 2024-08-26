package org.readify.gateway_service.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;

@Configuration
@EnableHystrix
@RequiredArgsConstructor
public class GatewayConfiguration {
    
    private final AuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder)
    {
        return builder.routes()
            .route(
                "user-service", r -> r.path("/api/v1/user/**")
                .filters(f -> f.filter(filter))
                .uri("lb://user-service")
            )
            .route(
                "authentication-service", r -> r.path("/api/v1/auth/**")
                .filters(f -> f.filter(filter))
                .uri("lb://authentication-service")
            )
            .route(
                "book-service", r -> r.path("/api/v1/book/**")
                .filters(f -> f.filter(filter))
                .uri("lb://book-service")
            )
            .route(
                "book-service", r -> r.path("/api/v1/tag/**")
                .filters(f -> f.filter(filter))
                .uri("lb://book-service")
            )
            .route(
                "file-service", r -> r.path("/api/v1/file/**")
                .filters(f -> f.filter(filter))
                .uri("lb://file-service")
            )
            .build();
    }
}
