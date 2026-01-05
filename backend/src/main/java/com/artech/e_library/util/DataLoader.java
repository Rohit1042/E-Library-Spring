package com.artech.e_library.util;


import com.artech.e_library.model.Book;
import com.artech.e_library.model.Role;
import com.artech.e_library.model.User;
import com.artech.e_library.repository.BookRepository;
import com.artech.e_library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0){
            User admin = User.builder()
                    .username("admin")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("123"))
                    .roles(Set.of(Role.ROLE_ADMIN))
                    .enabled(true)
                    .build();

            userRepository.save(admin);
        }

        if (bookRepository.count() == 0){
            bookRepository.save(Book.builder().title("Clean Code").author("Robert C. Martin").genre("Programming").isbn("9780132350884").description("A Handbook of Agile Software Craftsmanship").totalCopies(3).availableCopies(3).build());
            bookRepository.save(Book.builder().title("The Pragmatic Programmer").author("Andrew Hunt").genre("Programming").isbn("9780201616224").description("Your Journey to Mastery").totalCopies(2).availableCopies(2).build());
        }

    }
}
