package org.readify.book_service.Controller;

import java.util.List;

import org.readify.book_service.Payload.Request.BookRequest;
import org.readify.book_service.Payload.Request.BookUpdateRequest;
import org.readify.book_service.Payload.Response.BookResponse;
import org.readify.book_service.Service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/book")
public class BookController {
    
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Void> saveBook(@RequestBody @Valid BookRequest bookRequest)
    {
        bookService.saveBook(bookRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
    @GetMapping
    public ResponseEntity<List<BookResponse>> getAllBooks()
    {
        return ResponseEntity.ok(bookService.getAllBooks());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable("id") String bookId)
    {
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBook(@PathVariable("id") String bookId , @RequestBody @Valid BookUpdateRequest bookUpdateRequest)
    {
        bookService.updateBook(bookId, bookUpdateRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") String bookId)
    {
        bookService.deleteBook(bookId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
