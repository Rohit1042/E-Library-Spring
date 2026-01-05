package com.artech.e_library.repository;

import com.artech.e_library.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByGenreContainingIgnoreCase(String genre);


    @Query("SELECT b FROM Book b WHERE " +
            "(:term IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%',:term,'%')) " +
            "OR LOWER(b.author) LIKE LOWER(CONCAT('%',:term,'%')) " +
            "OR LOWER(b.genre) LIKE LOWER(CONCAT('%',:term,'%')))")
    List<Book> searchByAny(@Param("term") String term);

}
