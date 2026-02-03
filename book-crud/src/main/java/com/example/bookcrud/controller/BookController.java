package com.example.bookcrud.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import com.example.bookcrud.model.Book;
import com.example.bookcrud.service.impl.BookServiceImpl;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookServiceImpl service;

    public BookController(BookServiceImpl service) {
        this.service = service;
    }

    // POST - CREATE
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return service.createBook(book);
    }

    // GET - ALL
    @GetMapping
    public List<Book> getAllBooks() {
        return service.getAllBooks();
    }

    // GET - BY ID
    @GetMapping("/{id}")
    public Optional<Book> getBookById(@PathVariable Long id) {
        return service.getBookById(id);
    }

    // PUT - UPDATE
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return service.updateBook(id, book);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
    }

    // GET - BY YEAR
    @GetMapping("/publishedYear/{year}")
    public List<Book> getByPublishedYear(@PathVariable Integer year) {
        return service.findByPublishedYear(year);
    }
}

