package mehanicar.repository;

import mehanicar.domain.Automobile;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Automobile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutomobileRepository extends JpaRepository<Automobile, Long> {

}
