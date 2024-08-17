package org.readify.user_service.EntityRepository;

import java.util.UUID;
import java.util.Optional;

import org.readify.user_service.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.readify.user_service.Enum.ERole;



@Repository
public interface UserRepository extends JpaRepository<User, UUID>
{
    Optional<User> findByUsername(String username);
    Optional<User>findByEmail(String email);   
    List<User> findByRoles(List<ERole> roles);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
