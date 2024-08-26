package org.readify.file_service.Request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;

public record FileRequest(
    @NotNull
    MultipartFile file,
    String description
) {
}
