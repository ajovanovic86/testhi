package mehanicar.web.rest;

import mehanicar.MehanicarApp;

import mehanicar.domain.AutoTip;
import mehanicar.repository.AutoTipRepository;
import mehanicar.service.AutoTipService;
import mehanicar.service.dto.AutoTipDTO;
import mehanicar.service.mapper.AutoTipMapper;
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
 * Test class for the AutoTipResource REST controller.
 *
 * @see AutoTipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MehanicarApp.class)
public class AutoTipResourceIntTest {

    private static final String DEFAULT_BRAND_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BRAND_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    @Autowired
    private AutoTipRepository autoTipRepository;

    @Autowired
    private AutoTipMapper autoTipMapper;

    @Autowired
    private AutoTipService autoTipService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAutoTipMockMvc;

    private AutoTip autoTip;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AutoTipResource autoTipResource = new AutoTipResource(autoTipService);
        this.restAutoTipMockMvc = MockMvcBuilders.standaloneSetup(autoTipResource)
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
    public static AutoTip createEntity(EntityManager em) {
        AutoTip autoTip = new AutoTip()
            .brandName(DEFAULT_BRAND_NAME)
            .model(DEFAULT_MODEL);
        return autoTip;
    }

    @Before
    public void initTest() {
        autoTip = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutoTip() throws Exception {
        int databaseSizeBeforeCreate = autoTipRepository.findAll().size();

        // Create the AutoTip
        AutoTipDTO autoTipDTO = autoTipMapper.toDto(autoTip);
        restAutoTipMockMvc.perform(post("/api/auto-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autoTipDTO)))
            .andExpect(status().isCreated());

        // Validate the AutoTip in the database
        List<AutoTip> autoTipList = autoTipRepository.findAll();
        assertThat(autoTipList).hasSize(databaseSizeBeforeCreate + 1);
        AutoTip testAutoTip = autoTipList.get(autoTipList.size() - 1);
        assertThat(testAutoTip.getBrandName()).isEqualTo(DEFAULT_BRAND_NAME);
        assertThat(testAutoTip.getModel()).isEqualTo(DEFAULT_MODEL);
    }

    @Test
    @Transactional
    public void createAutoTipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = autoTipRepository.findAll().size();

        // Create the AutoTip with an existing ID
        autoTip.setId(1L);
        AutoTipDTO autoTipDTO = autoTipMapper.toDto(autoTip);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutoTipMockMvc.perform(post("/api/auto-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autoTipDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AutoTip in the database
        List<AutoTip> autoTipList = autoTipRepository.findAll();
        assertThat(autoTipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAutoTips() throws Exception {
        // Initialize the database
        autoTipRepository.saveAndFlush(autoTip);

        // Get all the autoTipList
        restAutoTipMockMvc.perform(get("/api/auto-tips?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autoTip.getId().intValue())))
            .andExpect(jsonPath("$.[*].brandName").value(hasItem(DEFAULT_BRAND_NAME.toString())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())));
    }

    @Test
    @Transactional
    public void getAutoTip() throws Exception {
        // Initialize the database
        autoTipRepository.saveAndFlush(autoTip);

        // Get the autoTip
        restAutoTipMockMvc.perform(get("/api/auto-tips/{id}", autoTip.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(autoTip.getId().intValue()))
            .andExpect(jsonPath("$.brandName").value(DEFAULT_BRAND_NAME.toString()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAutoTip() throws Exception {
        // Get the autoTip
        restAutoTipMockMvc.perform(get("/api/auto-tips/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutoTip() throws Exception {
        // Initialize the database
        autoTipRepository.saveAndFlush(autoTip);
        int databaseSizeBeforeUpdate = autoTipRepository.findAll().size();

        // Update the autoTip
        AutoTip updatedAutoTip = autoTipRepository.findOne(autoTip.getId());
        // Disconnect from session so that the updates on updatedAutoTip are not directly saved in db
        em.detach(updatedAutoTip);
        updatedAutoTip
            .brandName(UPDATED_BRAND_NAME)
            .model(UPDATED_MODEL);
        AutoTipDTO autoTipDTO = autoTipMapper.toDto(updatedAutoTip);

        restAutoTipMockMvc.perform(put("/api/auto-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autoTipDTO)))
            .andExpect(status().isOk());

        // Validate the AutoTip in the database
        List<AutoTip> autoTipList = autoTipRepository.findAll();
        assertThat(autoTipList).hasSize(databaseSizeBeforeUpdate);
        AutoTip testAutoTip = autoTipList.get(autoTipList.size() - 1);
        assertThat(testAutoTip.getBrandName()).isEqualTo(UPDATED_BRAND_NAME);
        assertThat(testAutoTip.getModel()).isEqualTo(UPDATED_MODEL);
    }

    @Test
    @Transactional
    public void updateNonExistingAutoTip() throws Exception {
        int databaseSizeBeforeUpdate = autoTipRepository.findAll().size();

        // Create the AutoTip
        AutoTipDTO autoTipDTO = autoTipMapper.toDto(autoTip);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAutoTipMockMvc.perform(put("/api/auto-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autoTipDTO)))
            .andExpect(status().isCreated());

        // Validate the AutoTip in the database
        List<AutoTip> autoTipList = autoTipRepository.findAll();
        assertThat(autoTipList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAutoTip() throws Exception {
        // Initialize the database
        autoTipRepository.saveAndFlush(autoTip);
        int databaseSizeBeforeDelete = autoTipRepository.findAll().size();

        // Get the autoTip
        restAutoTipMockMvc.perform(delete("/api/auto-tips/{id}", autoTip.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AutoTip> autoTipList = autoTipRepository.findAll();
        assertThat(autoTipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AutoTip.class);
        AutoTip autoTip1 = new AutoTip();
        autoTip1.setId(1L);
        AutoTip autoTip2 = new AutoTip();
        autoTip2.setId(autoTip1.getId());
        assertThat(autoTip1).isEqualTo(autoTip2);
        autoTip2.setId(2L);
        assertThat(autoTip1).isNotEqualTo(autoTip2);
        autoTip1.setId(null);
        assertThat(autoTip1).isNotEqualTo(autoTip2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AutoTipDTO.class);
        AutoTipDTO autoTipDTO1 = new AutoTipDTO();
        autoTipDTO1.setId(1L);
        AutoTipDTO autoTipDTO2 = new AutoTipDTO();
        assertThat(autoTipDTO1).isNotEqualTo(autoTipDTO2);
        autoTipDTO2.setId(autoTipDTO1.getId());
        assertThat(autoTipDTO1).isEqualTo(autoTipDTO2);
        autoTipDTO2.setId(2L);
        assertThat(autoTipDTO1).isNotEqualTo(autoTipDTO2);
        autoTipDTO1.setId(null);
        assertThat(autoTipDTO1).isNotEqualTo(autoTipDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(autoTipMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(autoTipMapper.fromId(null)).isNull();
    }
}
