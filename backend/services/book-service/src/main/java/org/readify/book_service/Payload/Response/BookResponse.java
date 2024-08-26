package org.readify.book_service.Payload.Response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


public record BookResponse(
    String id,

    String title,
    
    List<String> genres,

    List<String> tagsId,

    BigDecimal price,

    String authorId,

    String bookFile,

    String coverImage,
    
    LocalDate publishedDate,

    LocalDateTime createdAt,

    LocalDateTime updatedAt
) {
    
}
