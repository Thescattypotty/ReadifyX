package org.readify.book_service.Entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.readify.book_service.Enum.EGenre;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@Builder
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "books")
@EntityListeners(AuditingEntityListener.class)
public class Book {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;

    @Builder.Default
    @ElementCollection(targetClass = EGenre.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "book_genre", joinColumns = @JoinColumn(name = "book_id"))
    @Enumerated(EnumType.STRING)
    private List<EGenre> genres = new ArrayList<>();

    @Builder.Default
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Tag> tags = new ArrayList<>();

    private BigDecimal price;

    private String authorId;

    private String filePath;

    private String coverImagePath;

    private LocalDate publishedDate;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;
}
