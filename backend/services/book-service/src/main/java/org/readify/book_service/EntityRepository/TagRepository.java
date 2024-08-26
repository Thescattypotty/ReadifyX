package org.readify.book_service.EntityRepository;

import java.util.Optional;
import java.util.UUID;

import org.readify.book_service.Entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TagRepository extends JpaRepository<Tag, UUID>
{
    Optional<Tag> findByName(String name);
}
