package mehanicar.service;

import mehanicar.service.dto.ClaimDTO;
import java.util.List;

/**
 * Service Interface for managing Claim.
 */
public interface ClaimService {

    /**
     * Save a claim.
     *
     * @param claimDTO the entity to save
     * @return the persisted entity
     */
    ClaimDTO save(ClaimDTO claimDTO);

    /**
     * Get all the claims.
     *
     * @return the list of entities
     */
    List<ClaimDTO> findAll();

    /**
     * Get the "id" claim.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ClaimDTO findOne(Long id);

    /**
     * Delete the "id" claim.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
