package mehanicar.service.impl;

import mehanicar.service.AutomobileService;
import mehanicar.domain.Automobile;
import mehanicar.repository.AutomobileRepository;
import mehanicar.service.dto.AutomobileDTO;
import mehanicar.service.mapper.AutomobileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Automobile.
 */
@Service
@Transactional
public class AutomobileServiceImpl implements AutomobileService {

    private final Logger log = LoggerFactory.getLogger(AutomobileServiceImpl.class);

    private final AutomobileRepository automobileRepository;

    private final AutomobileMapper automobileMapper;

    public AutomobileServiceImpl(AutomobileRepository automobileRepository, AutomobileMapper automobileMapper) {
        this.automobileRepository = automobileRepository;
        this.automobileMapper = automobileMapper;
    }

    /**
     * Save a automobile.
     *
     * @param automobileDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AutomobileDTO save(AutomobileDTO automobileDTO) {
        log.debug("Request to save Automobile : {}", automobileDTO);
        Automobile automobile = automobileMapper.toEntity(automobileDTO);
        automobile = automobileRepository.save(automobile);
        return automobileMapper.toDto(automobile);
    }

    /**
     * Get all the automobiles.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AutomobileDTO> findAll() {
        log.debug("Request to get all Automobiles");
        return automobileRepository.findAll().stream()
            .map(automobileMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one automobile by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AutomobileDTO findOne(Long id) {
        log.debug("Request to get Automobile : {}", id);
        Automobile automobile = automobileRepository.findOne(id);
        return automobileMapper.toDto(automobile);
    }

    /**
     * Delete the automobile by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Automobile : {}", id);
        automobileRepository.delete(id);
    }
}
