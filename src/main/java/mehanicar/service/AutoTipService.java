package mehanicar.service;

import mehanicar.service.dto.AutoTipDTO;
import java.util.List;

/**
 * Service Interface for managing AutoTip.
 */
public interface AutoTipService {

    /**
     * Save a autoTip.
     *
     * @param autoTipDTO the entity to save
     * @return the persisted entity
     */
    AutoTipDTO save(AutoTipDTO autoTipDTO);

    /**
     * Get all the autoTips.
     *
     * @return the list of entities
     */
    List<AutoTipDTO> findAll();

    /**
     * Get the "id" autoTip.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AutoTipDTO findOne(Long id);

    /**
     * Delete the "id" autoTip.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
