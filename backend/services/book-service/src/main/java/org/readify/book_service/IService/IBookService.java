package org.readify.book_service.IService;

import java.util.List;
import org.readify.book_service.Payload.Request.BookRequest;
import org.readify.book_service.Payload.Request.BookUpdateRequest;
import org.readify.book_service.Payload.Response.BookResponse;

public interface IBookService {
    void saveBook(BookRequest bookRequest);
    BookResponse getBookById(String bookId);
    List<BookResponse> getAllBooks();
    void updateBook(String bookId , BookUpdateRequest bookUpdateRequest);
    void deleteBook(String bookId);
}
