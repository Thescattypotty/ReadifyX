package org.readify.book_service.Payload.Mapper;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.readify.book_service.Entity.Book;
import org.readify.book_service.EntityRepository.TagRepository;
import org.readify.book_service.Enum.EGenre;
import org.readify.book_service.FeignClient.FileClient;
import org.readify.book_service.Payload.Request.BookRequest;
import org.readify.book_service.Payload.Request.BookUpdateRequest;
import org.readify.book_service.Payload.Response.BookResponse;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookMapper {

    private final TagRepository tagRepository;
    private final FileClient fileClient;

    public Book toBook(BookRequest bookRequest)
    {   
        String bookFilePath = fileClient.uploadFile(bookRequest.bookFile())
                .orElseThrow(() -> new RuntimeException("Failed to upload book file"));

        String coverImagePath = bookRequest.coverImage() != null
                ? fileClient.uploadFile(bookRequest.coverImage()).orElse(null)
                : null;
        return Book.builder()
            .title(bookRequest.title())
            .genres(bookRequest.genres().stream()
                .map(EGenre::valueOf)
                .toList())
            .tags(bookRequest.tagsId().stream()
                .map(UUID::fromString)
                .map(tagRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList()))
            .price(bookRequest.price())
            .authorId(bookRequest.authorId())
            .filePath(bookFilePath)
            .coverImagePath(coverImagePath)
            .publishedDate(bookRequest.publishedDate())
            .build();
    }
    public Book toBook(BookUpdateRequest bookRequest)
    {
        return Book.builder()
            .title(bookRequest.title())
            .genres(bookRequest.genres().stream()
                .map(EGenre::valueOf)
                .toList())
            .tags(bookRequest.tagsId().stream()
                .map(UUID::fromString)
                .map(tagRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList()))
            .price(bookRequest.price())
            .authorId(bookRequest.authorId())
            .publishedDate(bookRequest.publishedDate())
            .build();
    }

    public BookResponse toBookResponse(Book book)
    {
        return new BookResponse(
            book.getId().toString(),
            book.getTitle(),
            book.getGenres().stream().map(EGenre::toString).toList(),
            book.getTags().stream().map(
                t -> t.getId().toString()
            ).collect(Collectors.toList()),
            book.getPrice(),
            book.getAuthorId(),
            book.getFilePath(),
            book.getCoverImagePath(),
            book.getPublishedDate(),
            book.getCreatedAt(),
            book.getUpdatedAt()
        );
    }
}
