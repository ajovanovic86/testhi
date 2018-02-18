package mehanicar.service.impl;

import mehanicar.service.AutoTipService;
import mehanicar.domain.AutoTip;
import mehanicar.repository.AutoTipRepository;
import mehanicar.service.dto.AutoTipDTO;
import mehanicar.service.mapper.AutoTipMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AutoTip.
 */
@Service
@Transactional
public class AutoTipServiceImpl implements AutoTipService {

    private final Logger log = LoggerFactory.getLogger(AutoTipServiceImpl.class);

    private final AutoTipRepository autoTipRepository;

    private final AutoTipMapper autoTipMapper;

    public AutoTipServiceImpl(AutoTipRepository autoTipRepository, AutoTipMapper autoTipMapper) {
        this.autoTipRepository = autoTipRepository;
        this.autoTipMapper = autoTipMapper;
    }

    /**
     * Save a autoTip.
     *
     * @param autoTipDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AutoTipDTO save(AutoTipDTO autoTipDTO) {
        log.debug("Request to save AutoTip : {}", autoTipDTO);
        AutoTip autoTip = autoTipMapper.toEntity(autoTipDTO);
        autoTip = autoTipRepository.save(autoTip);
        return autoTipMapper.toDto(autoTip);
    }

    /**
     * Get all the autoTips.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AutoTipDTO> findAll() {
        log.debug("Request to get all AutoTips");
        return autoTipRepository.findAll().stream()
            .map(autoTipMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one autoTip by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AutoTipDTO findOne(Long id) {
        log.debug("Request to get AutoTip : {}", id);
        AutoTip autoTip = autoTipRepository.findOne(id);
        return autoTipMapper.toDto(autoTip);
    }

    /**
     * Delete the autoTip by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AutoTip : {}", id);
        autoTipRepository.delete(id);
    }
}
