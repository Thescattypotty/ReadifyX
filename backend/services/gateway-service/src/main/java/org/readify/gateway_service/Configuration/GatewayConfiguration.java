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
                "authenication-service", r -> r.path("/api/v1/auth/**")
                .filters(f -> f.filter(filter))
                .uri("lb://authenication-service")
            )
            .build();
    }
}
