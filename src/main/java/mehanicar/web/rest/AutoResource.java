package mehanicar.web.rest;

import com.codahale.metrics.annotation.Timed;
import mehanicar.domain.Auto;
import mehanicar.service.AutoService;
import mehanicar.web.rest.errors.BadRequestAlertException;
import mehanicar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Auto.
 */
@RestController
@RequestMapping("/api")
public class AutoResource {

    private final Logger log = LoggerFactory.getLogger(AutoResource.class);

    private static final String ENTITY_NAME = "auto";

    private final AutoService autoService;

    public AutoResource(AutoService autoService) {
        this.autoService = autoService;
    }

    /**
     * POST  /autos : Create a new auto.
     *
     * @param auto the auto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new auto, or with status 400 (Bad Request) if the auto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/autos")
    @Timed
    public ResponseEntity<Auto> createAuto(@Valid @RequestBody Auto auto) throws URISyntaxException {
        log.debug("REST request to save Auto : {}", auto);
        if (auto.getId() != null) {
            throw new BadRequestAlertException("A new auto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Auto result = autoService.save(auto);
        return ResponseEntity.created(new URI("/api/autos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /autos : Updates an existing auto.
     *
     * @param auto the auto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated auto,
     * or with status 400 (Bad Request) if the auto is not valid,
     * or with status 500 (Internal Server Error) if the auto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/autos")
    @Timed
    public ResponseEntity<Auto> updateAuto(@Valid @RequestBody Auto auto) throws URISyntaxException {
        log.debug("REST request to update Auto : {}", auto);
        if (auto.getId() == null) {
            return createAuto(auto);
        }
        Auto result = autoService.save(auto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, auto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /autos : get all the autos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of autos in body
     */
    @GetMapping("/autos")
    @Timed
    public List<Auto> getAllAutos() {
        log.debug("REST request to get all Autos");
        return autoService.findAll();
        }

    /**
     * GET  /autos/:id : get the "id" auto.
     *
     * @param id the id of the auto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the auto, or with status 404 (Not Found)
     */
    @GetMapping("/autos/{id}")
    @Timed
    public ResponseEntity<Auto> getAuto(@PathVariable Long id) {
        log.debug("REST request to get Auto : {}", id);
        Auto auto = autoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(auto));
    }

    /**
     * DELETE  /autos/:id : delete the "id" auto.
     *
     * @param id the id of the auto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/autos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAuto(@PathVariable Long id) {
        log.debug("REST request to delete Auto : {}", id);
        autoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
