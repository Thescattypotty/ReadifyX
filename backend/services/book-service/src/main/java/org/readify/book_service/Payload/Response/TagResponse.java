package org.readify.book_service.Payload.Response;

import java.time.LocalDateTime;

public record TagResponse(
    String id,
    String name,
    LocalDateTime createdAt
) {
}
