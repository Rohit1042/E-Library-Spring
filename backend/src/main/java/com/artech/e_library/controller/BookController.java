package com.artech.e_library.controller;


import com.artech.e_library.model.Book;
import com.artech.e_library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks(){
        return ResponseEntity.ok(bookService.listAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Book>> search(@RequestParam String term) {
        return ResponseEntity.ok(bookService.searchBook(term));
    }



    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id){
        return ResponseEntity.ok(bookService.getBookById(id));
    }



}
