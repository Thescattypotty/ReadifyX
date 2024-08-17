package org.readify.gateway_service.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class JwtUtils {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Key key;

    @PostConstruct
    public void initKey()
    {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver)
    {
        return claimsResolver.apply(
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJwt(token)
                .getBody()  
        );
    }
    public Date getExpirationDate(String token)
    {
        return extractClaim(token, Claims::getExpiration);
    }

    public String generateToken(String username , List<String> roles , String tokenType)
    {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", roles);

        Long expMillis = "ACCESS".equalsIgnoreCase(tokenType)
            ? expiration * 1000
            : expiration * 1000 *5;
        

        return Jwts
            .builder()
            .setClaims(claims)
            .setSubject(username)
            .setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis() + expMillis))
            .signWith(key)
            .compact();
    }
    public boolean isTokenValid(String token , String username)
    {
        return (!isTokenExpired(token) && extractClaim(token, Claims::getSubject).equals(username));
    }
    public boolean isTokenExpired(String token) {
        return getExpirationDate(token).before(new Date());
    }
}
