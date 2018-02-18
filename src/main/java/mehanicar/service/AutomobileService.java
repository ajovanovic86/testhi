package mehanicar.service;

import mehanicar.service.dto.AutomobileDTO;
import java.util.List;

/**
 * Service Interface for managing Automobile.
 */
public interface AutomobileService {

    /**
     * Save a automobile.
     *
     * @param automobileDTO the entity to save
     * @return the persisted entity
     */
    AutomobileDTO save(AutomobileDTO automobileDTO);

    /**
     * Get all the automobiles.
     *
     * @return the list of entities
     */
    List<AutomobileDTO> findAll();

    /**
     * Get the "id" automobile.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AutomobileDTO findOne(Long id);

    /**
     * Delete the "id" automobile.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
