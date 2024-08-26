package org.readify.book_service.Payload.Request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BookUpdateRequest(
    @NotNull 
    @NotBlank 
    String title,
    
    @NotNull 
    List<String> genres,
    
    List<String> tagsId,

    @NotNull 
    BigDecimal price,

    String authorId,

    @NotNull
    FileRequest bookFile,

    FileRequest coverImage,

    @NotNull 
    LocalDate publishedDate

) {

}
