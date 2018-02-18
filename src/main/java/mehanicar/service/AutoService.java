package mehanicar.service;

import mehanicar.domain.Auto;
import java.util.List;

/**
 * Service Interface for managing Auto.
 */
public interface AutoService {

    /**
     * Save a auto.
     *
     * @param auto the entity to save
     * @return the persisted entity
     */
    Auto save(Auto auto);

    /**
     * Get all the autos.
     *
     * @return the list of entities
     */
    List<Auto> findAll();

    /**
     * Get the "id" auto.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Auto findOne(Long id);

    /**
     * Delete the "id" auto.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
