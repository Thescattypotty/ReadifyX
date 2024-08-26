package org.readify.book_service.Payload.Request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;

public record FileRequest(
    String id,
    @NotNull
    MultipartFile file,
    String description
) {
}
