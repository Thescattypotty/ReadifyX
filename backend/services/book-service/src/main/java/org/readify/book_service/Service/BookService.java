package org.readify.book_service.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.readify.book_service.Entity.Book;
import org.readify.book_service.EntityRepository.BookRepository;
import org.readify.book_service.Exception.ResourceNotFoundException;
import org.readify.book_service.IService.IBookService;
import org.readify.book_service.Payload.Mapper.BookMapper;
import org.readify.book_service.Payload.Request.BookRequest;
import org.readify.book_service.Payload.Request.BookUpdateRequest;
import org.readify.book_service.Payload.Response.BookResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService
{
    private final BookMapper bookMapper;
    private final BookRepository bookRepository;

    @Override
    @Transactional
    public void saveBook(BookRequest bookRequest) {
        Book book = bookMapper.toBook(bookRequest);
        bookRepository.save(book);

    }

    @Override
    @Transactional
    public void updateBook(String bookId, BookUpdateRequest bookUpdateRequest) {
        if(bookRepository.existsById(UUID.fromString(bookId)))
        {
            Book book = bookMapper.toBook(bookUpdateRequest);
            book.setId(UUID.fromString(bookId));
            bookRepository.save(book);
        }else{
            throw new ResourceNotFoundException("Cannot find the Book with id : "+ bookId);
        }
        
    }

    @Override
    public BookResponse getBookById(String bookId) {
        return bookMapper.toBookResponse(
            bookRepository.findById(UUID.fromString(bookId))
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find the Book with id : "+ bookId))
        );
    }

    @Override
    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll().stream()
            .map(
                b -> bookMapper.toBookResponse(b)
            ).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteBook(String bookId) {
        if (bookRepository.existsById(UUID.fromString(bookId))) {
            bookRepository.deleteById(UUID.fromString(bookId));
        } else {
            throw new ResourceNotFoundException("Cannot find the Book with id : " + bookId);
        }
    }
    
}
