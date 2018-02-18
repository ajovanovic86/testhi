package mehanicar.service.mapper;

import mehanicar.domain.*;
import mehanicar.service.dto.AutoTipDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AutoTip and its DTO AutoTipDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AutoTipMapper extends EntityMapper<AutoTipDTO, AutoTip> {



    default AutoTip fromId(Long id) {
        if (id == null) {
            return null;
        }
        AutoTip autoTip = new AutoTip();
        autoTip.setId(id);
        return autoTip;
    }
}
