package com.artech.e_library.controller;


import com.artech.e_library.model.BorrowRecord;
import com.artech.e_library.model.BorrowStatus;
import com.artech.e_library.model.User;
import com.artech.e_library.repository.UserRepository;
import com.artech.e_library.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
public class BorrowController {

    @Autowired
    private BorrowService borrowService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/book/{bookId}")
    public ResponseEntity<BorrowRecord> borrowBook(@PathVariable Long bookId, Authentication authentication){

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("user not exists"));
        BorrowRecord record = borrowService.borrowBook(user.getId(), bookId);
        return ResponseEntity.ok(record);

    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/return/{recordId}")
    public ResponseEntity<BorrowRecord> returnBook(@PathVariable Long recordId){

        BorrowRecord record = borrowService.returnBook(recordId);
        return ResponseEntity.ok(record);

    }

    @GetMapping("/my-records")
    public ResponseEntity<List<BorrowRecord>> myRecords(Authentication authentication){

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not exists"));
        return ResponseEntity.ok(borrowService.getUserBorrowRecords(user.getId())) ;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/all")
    public ResponseEntity<List<BorrowRecord>> allRecords(){
        return ResponseEntity.ok(borrowService.getAllBorrowRecords());
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<BorrowRecord>> overdueRecords(){
        return ResponseEntity.ok(borrowService.getOverdueRecords());
    }

    @GetMapping("/status")
    public ResponseEntity<List<BorrowRecord>> borrowRecordByStatus(BorrowStatus status){
        return ResponseEntity.ok(borrowService.getBorrowRecordsByStatus(status));
    }



}
