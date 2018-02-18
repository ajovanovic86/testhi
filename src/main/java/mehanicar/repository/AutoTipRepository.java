package mehanicar.repository;

import mehanicar.domain.AutoTip;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AutoTip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutoTipRepository extends JpaRepository<AutoTip, Long> {

}
