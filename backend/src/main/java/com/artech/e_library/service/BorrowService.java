package com.artech.e_library.service;


import com.artech.e_library.model.Book;
import com.artech.e_library.model.BorrowRecord;
import com.artech.e_library.model.BorrowStatus;
import com.artech.e_library.model.User;
import com.artech.e_library.repository.BookRepository;
import com.artech.e_library.repository.BorrowRecordRepository;
import com.artech.e_library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    private static final int BORROW_DAYS = 14;


    @Transactional
    public BorrowRecord borrowBook(Long userId, Long bookId){

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not exists"));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException("Book not found"));

        if (book.getAvailableCopies() <=0){
            throw new IllegalStateException("No copies available");
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        LocalDate borrowDate = LocalDate.now();
        LocalDate dueDate = borrowDate.plusDays(BORROW_DAYS);

        BorrowRecord record = BorrowRecord.builder()
                .user(user)
                .book(book)
                .borrowDate(borrowDate)
                .dueDate(dueDate)
                .status(BorrowStatus.BORROWED)
                .build();

        return borrowRecordRepository.save(record);

    }

    public BorrowRecord returnBook(Long recordId){

        BorrowRecord record = borrowRecordRepository.findById(recordId).orElseThrow(() -> new IllegalArgumentException("Record not found"));

        if (record.getStatus() == BorrowStatus.RETURNED){
            throw new IllegalStateException("Book already returned");
        }

        record.setStatus(BorrowStatus.RETURNED);
        record.setReturnDate(LocalDate.now());

        Book book = record.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);

        return borrowRecordRepository.save(record);

    }


    public List<BorrowRecord> getUserBorrowRecords(Long userId){
        return borrowRecordRepository.findByUserId(userId);
    }

    public List<BorrowRecord> getBorrowRecordsByStatus(BorrowStatus status){
        return borrowRecordRepository.findByStatus(status);
    }

    public List<BorrowRecord> getAllBorrowRecords(){
        return borrowRecordRepository.findAll();
    }

    public List<BorrowRecord> getOverdueRecords(){
        return borrowRecordRepository.findByStatusAndDueDateBefore(BorrowStatus.BORROWED, LocalDate.now());
    }






}
