package mehanicar.service.impl;

import mehanicar.service.ClaimService;
import mehanicar.domain.Claim;
import mehanicar.repository.ClaimRepository;
import mehanicar.service.dto.ClaimDTO;
import mehanicar.service.mapper.ClaimMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Claim.
 */
@Service
@Transactional
public class ClaimServiceImpl implements ClaimService {

    private final Logger log = LoggerFactory.getLogger(ClaimServiceImpl.class);

    private final ClaimRepository claimRepository;

    private final ClaimMapper claimMapper;

    public ClaimServiceImpl(ClaimRepository claimRepository, ClaimMapper claimMapper) {
        this.claimRepository = claimRepository;
        this.claimMapper = claimMapper;
    }

    /**
     * Save a claim.
     *
     * @param claimDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClaimDTO save(ClaimDTO claimDTO) {
        log.debug("Request to save Claim : {}", claimDTO);
        Claim claim = claimMapper.toEntity(claimDTO);
        claim = claimRepository.save(claim);
        return claimMapper.toDto(claim);
    }

    /**
     * Get all the claims.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ClaimDTO> findAll() {
        log.debug("Request to get all Claims");
        return claimRepository.findAll().stream()
            .map(claimMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one claim by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ClaimDTO findOne(Long id) {
        log.debug("Request to get Claim : {}", id);
        Claim claim = claimRepository.findOne(id);
        return claimMapper.toDto(claim);
    }

    /**
     * Delete the claim by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Claim : {}", id);
        claimRepository.delete(id);
    }
}
