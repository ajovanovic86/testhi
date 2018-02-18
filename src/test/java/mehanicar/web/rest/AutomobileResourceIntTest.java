package mehanicar.web.rest;

import mehanicar.MehanicarApp;

import mehanicar.domain.Automobile;
import mehanicar.repository.AutomobileRepository;
import mehanicar.service.AutomobileService;
import mehanicar.service.dto.AutomobileDTO;
import mehanicar.service.mapper.AutomobileMapper;
import mehanicar.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static mehanicar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AutomobileResource REST controller.
 *
 * @see AutomobileResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MehanicarApp.class)
public class AutomobileResourceIntTest {

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    @Autowired
    private AutomobileRepository automobileRepository;

    @Autowired
    private AutomobileMapper automobileMapper;

    @Autowired
    private AutomobileService automobileService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAutomobileMockMvc;

    private Automobile automobile;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AutomobileResource automobileResource = new AutomobileResource(automobileService);
        this.restAutomobileMockMvc = MockMvcBuilders.standaloneSetup(automobileResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Automobile createEntity(EntityManager em) {
        Automobile automobile = new Automobile()
            .color(DEFAULT_COLOR);
        return automobile;
    }

    @Before
    public void initTest() {
        automobile = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutomobile() throws Exception {
        int databaseSizeBeforeCreate = automobileRepository.findAll().size();

        // Create the Automobile
        AutomobileDTO automobileDTO = automobileMapper.toDto(automobile);
        restAutomobileMockMvc.perform(post("/api/automobiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(automobileDTO)))
            .andExpect(status().isCreated());

        // Validate the Automobile in the database
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeCreate + 1);
        Automobile testAutomobile = automobileList.get(automobileList.size() - 1);
        assertThat(testAutomobile.getColor()).isEqualTo(DEFAULT_COLOR);
    }

    @Test
    @Transactional
    public void createAutomobileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = automobileRepository.findAll().size();

        // Create the Automobile with an existing ID
        automobile.setId(1L);
        AutomobileDTO automobileDTO = automobileMapper.toDto(automobile);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutomobileMockMvc.perform(post("/api/automobiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(automobileDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Automobile in the database
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAutomobiles() throws Exception {
        // Initialize the database
        automobileRepository.saveAndFlush(automobile);

        // Get all the automobileList
        restAutomobileMockMvc.perform(get("/api/automobiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(automobile.getId().intValue())))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())));
    }

    @Test
    @Transactional
    public void getAutomobile() throws Exception {
        // Initialize the database
        automobileRepository.saveAndFlush(automobile);

        // Get the automobile
        restAutomobileMockMvc.perform(get("/api/automobiles/{id}", automobile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(automobile.getId().intValue()))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAutomobile() throws Exception {
        // Get the automobile
        restAutomobileMockMvc.perform(get("/api/automobiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutomobile() throws Exception {
        // Initialize the database
        automobileRepository.saveAndFlush(automobile);
        int databaseSizeBeforeUpdate = automobileRepository.findAll().size();

        // Update the automobile
        Automobile updatedAutomobile = automobileRepository.findOne(automobile.getId());
        // Disconnect from session so that the updates on updatedAutomobile are not directly saved in db
        em.detach(updatedAutomobile);
        updatedAutomobile
            .color(UPDATED_COLOR);
        AutomobileDTO automobileDTO = automobileMapper.toDto(updatedAutomobile);

        restAutomobileMockMvc.perform(put("/api/automobiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(automobileDTO)))
            .andExpect(status().isOk());

        // Validate the Automobile in the database
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeUpdate);
        Automobile testAutomobile = automobileList.get(automobileList.size() - 1);
        assertThat(testAutomobile.getColor()).isEqualTo(UPDATED_COLOR);
    }

    @Test
    @Transactional
    public void updateNonExistingAutomobile() throws Exception {
        int databaseSizeBeforeUpdate = automobileRepository.findAll().size();

        // Create the Automobile
        AutomobileDTO automobileDTO = automobileMapper.toDto(automobile);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAutomobileMockMvc.perform(put("/api/automobiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(automobileDTO)))
            .andExpect(status().isCreated());

        // Validate the Automobile in the database
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAutomobile() throws Exception {
        // Initialize the database
        automobileRepository.saveAndFlush(automobile);
        int databaseSizeBeforeDelete = automobileRepository.findAll().size();

        // Get the automobile
        restAutomobileMockMvc.perform(delete("/api/automobiles/{id}", automobile.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Automobile.class);
        Automobile automobile1 = new Automobile();
        automobile1.setId(1L);
        Automobile automobile2 = new Automobile();
        automobile2.setId(automobile1.getId());
        assertThat(automobile1).isEqualTo(automobile2);
        automobile2.setId(2L);
        assertThat(automobile1).isNotEqualTo(automobile2);
        automobile1.setId(null);
        assertThat(automobile1).isNotEqualTo(automobile2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AutomobileDTO.class);
        AutomobileDTO automobileDTO1 = new AutomobileDTO();
        automobileDTO1.setId(1L);
        AutomobileDTO automobileDTO2 = new AutomobileDTO();
        assertThat(automobileDTO1).isNotEqualTo(automobileDTO2);
        automobileDTO2.setId(automobileDTO1.getId());
        assertThat(automobileDTO1).isEqualTo(automobileDTO2);
        automobileDTO2.setId(2L);
        assertThat(automobileDTO1).isNotEqualTo(automobileDTO2);
        automobileDTO1.setId(null);
        assertThat(automobileDTO1).isNotEqualTo(automobileDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(automobileMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(automobileMapper.fromId(null)).isNull();
    }
}
