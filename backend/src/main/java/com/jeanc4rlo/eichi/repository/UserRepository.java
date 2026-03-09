package com.jeanc4rlo.eichi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jeanc4rlo.eichi.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByUsername(String username);
}
