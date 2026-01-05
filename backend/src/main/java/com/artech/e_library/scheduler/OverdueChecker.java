package com.artech.e_library.scheduler;


import com.artech.e_library.model.BorrowRecord;
import com.artech.e_library.model.BorrowStatus;
import com.artech.e_library.repository.BorrowRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class OverdueChecker {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;


    public void markOverdue(){
        List<BorrowRecord> overdue = borrowRecordRepository.findByStatusAndDueDateBefore(BorrowStatus.BORROWED, LocalDate.now());

        for (BorrowRecord r : overdue){
            r.setStatus(BorrowStatus.OVERDUE);
        }
        borrowRecordRepository.saveAll(overdue);
    }


}
