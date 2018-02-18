package mehanicar.repository;

import mehanicar.domain.Auto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Auto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {

}
