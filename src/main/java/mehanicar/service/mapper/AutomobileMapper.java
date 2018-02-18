package mehanicar.service.mapper;

import mehanicar.domain.*;
import mehanicar.service.dto.AutomobileDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Automobile and its DTO AutomobileDTO.
 */
@Mapper(componentModel = "spring", uses = {AutoTipMapper.class})
public interface AutomobileMapper extends EntityMapper<AutomobileDTO, Automobile> {

    @Mapping(source = "autoTip.id", target = "autoTipId")
    AutomobileDTO toDto(Automobile automobile);

    @Mapping(source = "autoTipId", target = "autoTip")
    @Mapping(target = "claims", ignore = true)
    Automobile toEntity(AutomobileDTO automobileDTO);

    default Automobile fromId(Long id) {
        if (id == null) {
            return null;
        }
        Automobile automobile = new Automobile();
        automobile.setId(id);
        return automobile;
    }
}
