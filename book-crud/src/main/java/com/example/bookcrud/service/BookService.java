package com.example.bookcrud.service;

import java.util.List;
import java.util.Optional;

import com.example.bookcrud.model.Book;

public interface BookService {

    List<Book> getAllBooks();
    Optional<Book> getBookById(Long id);
    Book createBook(Book book);
    Book updateBook(Long id, Book book);
    void deleteBook(Long id);
    void deleteAllBooks();
    List<Book> findByPublishedYear(Integer publishedYear);

}
