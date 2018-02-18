package mehanicar.web.rest;

import com.codahale.metrics.annotation.Timed;
import mehanicar.service.ClaimService;
import mehanicar.web.rest.errors.BadRequestAlertException;
import mehanicar.web.rest.util.HeaderUtil;
import mehanicar.service.dto.ClaimDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Claim.
 */
@RestController
@RequestMapping("/api")
public class ClaimResource {

    private final Logger log = LoggerFactory.getLogger(ClaimResource.class);

    private static final String ENTITY_NAME = "claim";

    private final ClaimService claimService;

    public ClaimResource(ClaimService claimService) {
        this.claimService = claimService;
    }

    /**
     * POST  /claims : Create a new claim.
     *
     * @param claimDTO the claimDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new claimDTO, or with status 400 (Bad Request) if the claim has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/claims")
    @Timed
    public ResponseEntity<ClaimDTO> createClaim(@RequestBody ClaimDTO claimDTO) throws URISyntaxException {
        log.debug("REST request to save Claim : {}", claimDTO);
        if (claimDTO.getId() != null) {
            throw new BadRequestAlertException("A new claim cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClaimDTO result = claimService.save(claimDTO);
        return ResponseEntity.created(new URI("/api/claims/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /claims : Updates an existing claim.
     *
     * @param claimDTO the claimDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated claimDTO,
     * or with status 400 (Bad Request) if the claimDTO is not valid,
     * or with status 500 (Internal Server Error) if the claimDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/claims")
    @Timed
    public ResponseEntity<ClaimDTO> updateClaim(@RequestBody ClaimDTO claimDTO) throws URISyntaxException {
        log.debug("REST request to update Claim : {}", claimDTO);
        if (claimDTO.getId() == null) {
            return createClaim(claimDTO);
        }
        ClaimDTO result = claimService.save(claimDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, claimDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /claims : get all the claims.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of claims in body
     */
    @GetMapping("/claims")
    @Timed
    public List<ClaimDTO> getAllClaims() {
        log.debug("REST request to get all Claims");
        return claimService.findAll();
        }

    /**
     * GET  /claims/:id : get the "id" claim.
     *
     * @param id the id of the claimDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the claimDTO, or with status 404 (Not Found)
     */
    @GetMapping("/claims/{id}")
    @Timed
    public ResponseEntity<ClaimDTO> getClaim(@PathVariable Long id) {
        log.debug("REST request to get Claim : {}", id);
        ClaimDTO claimDTO = claimService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(claimDTO));
    }

    /**
     * DELETE  /claims/:id : delete the "id" claim.
     *
     * @param id the id of the claimDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/claims/{id}")
    @Timed
    public ResponseEntity<Void> deleteClaim(@PathVariable Long id) {
        log.debug("REST request to delete Claim : {}", id);
        claimService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
