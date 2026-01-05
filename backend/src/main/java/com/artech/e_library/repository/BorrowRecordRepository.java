package com.artech.e_library.repository;

import com.artech.e_library.model.BorrowRecord;
import com.artech.e_library.model.BorrowStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {

    List<BorrowRecord> findByUserId(Long userId);
    List<BorrowRecord> findByStatus(BorrowStatus status);
    List<BorrowRecord> findByStatusAndDueDateBefore(BorrowStatus status, LocalDate date);


}
