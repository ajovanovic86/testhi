package mehanicar.web.rest;

import com.codahale.metrics.annotation.Timed;
import mehanicar.service.AutomobileService;
import mehanicar.web.rest.errors.BadRequestAlertException;
import mehanicar.web.rest.util.HeaderUtil;
import mehanicar.service.dto.AutomobileDTO;
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
 * REST controller for managing Automobile.
 */
@RestController
@RequestMapping("/api")
public class AutomobileResource {

    private final Logger log = LoggerFactory.getLogger(AutomobileResource.class);

    private static final String ENTITY_NAME = "automobile";

    private final AutomobileService automobileService;

    public AutomobileResource(AutomobileService automobileService) {
        this.automobileService = automobileService;
    }

    /**
     * POST  /automobiles : Create a new automobile.
     *
     * @param automobileDTO the automobileDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new automobileDTO, or with status 400 (Bad Request) if the automobile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/automobiles")
    @Timed
    public ResponseEntity<AutomobileDTO> createAutomobile(@RequestBody AutomobileDTO automobileDTO) throws URISyntaxException {
        log.debug("REST request to save Automobile : {}", automobileDTO);
        if (automobileDTO.getId() != null) {
            throw new BadRequestAlertException("A new automobile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AutomobileDTO result = automobileService.save(automobileDTO);
        return ResponseEntity.created(new URI("/api/automobiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /automobiles : Updates an existing automobile.
     *
     * @param automobileDTO the automobileDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated automobileDTO,
     * or with status 400 (Bad Request) if the automobileDTO is not valid,
     * or with status 500 (Internal Server Error) if the automobileDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/automobiles")
    @Timed
    public ResponseEntity<AutomobileDTO> updateAutomobile(@RequestBody AutomobileDTO automobileDTO) throws URISyntaxException {
        log.debug("REST request to update Automobile : {}", automobileDTO);
        if (automobileDTO.getId() == null) {
            return createAutomobile(automobileDTO);
        }
        AutomobileDTO result = automobileService.save(automobileDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, automobileDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /automobiles : get all the automobiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of automobiles in body
     */
    @GetMapping("/automobiles")
    @Timed
    public List<AutomobileDTO> getAllAutomobiles() {
        log.debug("REST request to get all Automobiles");
        return automobileService.findAll();
        }

    /**
     * GET  /automobiles/:id : get the "id" automobile.
     *
     * @param id the id of the automobileDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the automobileDTO, or with status 404 (Not Found)
     */
    @GetMapping("/automobiles/{id}")
    @Timed
    public ResponseEntity<AutomobileDTO> getAutomobile(@PathVariable Long id) {
        log.debug("REST request to get Automobile : {}", id);
        AutomobileDTO automobileDTO = automobileService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(automobileDTO));
    }

    /**
     * DELETE  /automobiles/:id : delete the "id" automobile.
     *
     * @param id the id of the automobileDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/automobiles/{id}")
    @Timed
    public ResponseEntity<Void> deleteAutomobile(@PathVariable Long id) {
        log.debug("REST request to delete Automobile : {}", id);
        automobileService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
