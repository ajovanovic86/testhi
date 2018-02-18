package mehanicar.web.rest;

import com.codahale.metrics.annotation.Timed;
import mehanicar.service.AutoTipService;
import mehanicar.web.rest.errors.BadRequestAlertException;
import mehanicar.web.rest.util.HeaderUtil;
import mehanicar.service.dto.AutoTipDTO;
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
 * REST controller for managing AutoTip.
 */
@RestController
@RequestMapping("/api")
public class AutoTipResource {

    private final Logger log = LoggerFactory.getLogger(AutoTipResource.class);

    private static final String ENTITY_NAME = "autoTip";

    private final AutoTipService autoTipService;

    public AutoTipResource(AutoTipService autoTipService) {
        this.autoTipService = autoTipService;
    }

    /**
     * POST  /auto-tips : Create a new autoTip.
     *
     * @param autoTipDTO the autoTipDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new autoTipDTO, or with status 400 (Bad Request) if the autoTip has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/auto-tips")
    @Timed
    public ResponseEntity<AutoTipDTO> createAutoTip(@RequestBody AutoTipDTO autoTipDTO) throws URISyntaxException {
        log.debug("REST request to save AutoTip : {}", autoTipDTO);
        if (autoTipDTO.getId() != null) {
            throw new BadRequestAlertException("A new autoTip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AutoTipDTO result = autoTipService.save(autoTipDTO);
        return ResponseEntity.created(new URI("/api/auto-tips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /auto-tips : Updates an existing autoTip.
     *
     * @param autoTipDTO the autoTipDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated autoTipDTO,
     * or with status 400 (Bad Request) if the autoTipDTO is not valid,
     * or with status 500 (Internal Server Error) if the autoTipDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/auto-tips")
    @Timed
    public ResponseEntity<AutoTipDTO> updateAutoTip(@RequestBody AutoTipDTO autoTipDTO) throws URISyntaxException {
        log.debug("REST request to update AutoTip : {}", autoTipDTO);
        if (autoTipDTO.getId() == null) {
            return createAutoTip(autoTipDTO);
        }
        AutoTipDTO result = autoTipService.save(autoTipDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, autoTipDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /auto-tips : get all the autoTips.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of autoTips in body
     */
    @GetMapping("/auto-tips")
    @Timed
    public List<AutoTipDTO> getAllAutoTips() {
        log.debug("REST request to get all AutoTips");
        return autoTipService.findAll();
        }

    /**
     * GET  /auto-tips/:id : get the "id" autoTip.
     *
     * @param id the id of the autoTipDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the autoTipDTO, or with status 404 (Not Found)
     */
    @GetMapping("/auto-tips/{id}")
    @Timed
    public ResponseEntity<AutoTipDTO> getAutoTip(@PathVariable Long id) {
        log.debug("REST request to get AutoTip : {}", id);
        AutoTipDTO autoTipDTO = autoTipService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(autoTipDTO));
    }

    /**
     * DELETE  /auto-tips/:id : delete the "id" autoTip.
     *
     * @param id the id of the autoTipDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/auto-tips/{id}")
    @Timed
    public ResponseEntity<Void> deleteAutoTip(@PathVariable Long id) {
        log.debug("REST request to delete AutoTip : {}", id);
        autoTipService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
