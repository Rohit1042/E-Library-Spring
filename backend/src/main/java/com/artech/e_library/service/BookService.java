package com.artech.e_library.service;


import com.artech.e_library.model.Book;
import com.artech.e_library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book addBook(Book book){

        book.setAvailableCopies(book.getTotalCopies());
        return bookRepository.save(book);

    }

    public Book updateBook(Long id, Book updated){

        Book book = bookRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Book not found "));

        book.setTitle(updated.getTitle());
        book.setAuthor(updated.getAuthor());
        book.setGenre(updated.getGenre());
        book.setIsbn(updated.getIsbn());
        book.setDescription(updated.getDescription());
        book.setTotalCopies(updated.getTotalCopies());

        int diff = updated.getTotalCopies() - book.getTotalCopies();

        book.setAvailableCopies(Math.max(0, book.getAvailableCopies() + diff));

        return bookRepository.save(book);

    }


    public void deleteBook(Long id){
        bookRepository.deleteById(id);
    }

    public Book getBookById(Long id){
        return bookRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Book not found"));
    }

    public List<Book> listAll(){
        return bookRepository.findAll();
    }

    public List<Book> searchBook(String term){
        return bookRepository.searchByAny(term);
    }


}
