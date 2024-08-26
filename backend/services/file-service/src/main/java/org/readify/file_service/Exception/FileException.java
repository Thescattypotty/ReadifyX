package org.readify.file_service.Exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class FileException extends RuntimeException
{
    private final String message;
}
