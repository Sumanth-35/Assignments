package com.example.bookcrud.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.bookcrud.model.Book;
import com.example.bookcrud.repository.BookRepository;
import com.example.bookcrud.service.BookService;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository repository;

    public BookServiceImpl(BookRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Book createBook(Book book) {
        return repository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book book) {
        Book existing = repository.findById(id).orElseThrow();
        existing.setTitle(book.getTitle());
        existing.setDescription(book.getDescription());
        existing.setPublishedYear(book.getPublishedYear());

        return repository.save(existing);
    }

    @Override
    public void deleteBook(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteAllBooks() {
        repository.deleteAll();
    }

    @Override
    public List<Book> findByPublishedYear(Integer year) {
        return repository.findByPublishedYear(year);
    }

}