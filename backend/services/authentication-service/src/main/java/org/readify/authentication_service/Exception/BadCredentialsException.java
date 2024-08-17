package org.readify.authentication_service.Exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class BadCredentialsException extends RuntimeException
{
    private final String message;
}
