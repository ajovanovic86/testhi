package mehanicar.service.impl;

import mehanicar.service.AutoService;
import mehanicar.domain.Auto;
import mehanicar.repository.AutoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Auto.
 */
@Service
@Transactional
public class AutoServiceImpl implements AutoService {

    private final Logger log = LoggerFactory.getLogger(AutoServiceImpl.class);

    private final AutoRepository autoRepository;

    public AutoServiceImpl(AutoRepository autoRepository) {
        this.autoRepository = autoRepository;
    }

    /**
     * Save a auto.
     *
     * @param auto the entity to save
     * @return the persisted entity
     */
    @Override
    public Auto save(Auto auto) {
        log.debug("Request to save Auto : {}", auto);
        return autoRepository.save(auto);
    }

    /**
     * Get all the autos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Auto> findAll() {
        log.debug("Request to get all Autos");
        return autoRepository.findAll();
    }

    /**
     * Get one auto by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Auto findOne(Long id) {
        log.debug("Request to get Auto : {}", id);
        return autoRepository.findOne(id);
    }

    /**
     * Delete the auto by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Auto : {}", id);
        autoRepository.delete(id);
    }
}
