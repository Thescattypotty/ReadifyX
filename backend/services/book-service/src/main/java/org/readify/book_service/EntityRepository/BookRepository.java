package org.readify.book_service.EntityRepository;

import java.util.UUID;

import org.readify.book_service.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.readify.book_service.Enum.EGenre;
import org.readify.book_service.Entity.Tag;
import java.time.LocalDate;




@Repository
public interface BookRepository extends JpaRepository<Book, UUID>
{
    List<Book> findByGenres(List<EGenre> genres);
    List<Book> findByAuthorId(String authorId);
    List<Book> findByTags(List<Tag> tags);
    List<Book> findByGenresAndTags(List<EGenre> genres, List<Tag> tags);

    List<Book> findByPublishedDateBetween(LocalDate startDate , LocalDate endDate);
}
