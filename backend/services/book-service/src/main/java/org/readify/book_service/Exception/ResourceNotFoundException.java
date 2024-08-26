package org.readify.book_service.Exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ResourceNotFoundException extends RuntimeException
{
    private final String message;
}
