package mehanicar.service.mapper;

import mehanicar.domain.*;
import mehanicar.service.dto.ClaimDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Claim and its DTO ClaimDTO.
 */
@Mapper(componentModel = "spring", uses = {AutomobileMapper.class})
public interface ClaimMapper extends EntityMapper<ClaimDTO, Claim> {

    @Mapping(source = "automobile.id", target = "automobileId")
    ClaimDTO toDto(Claim claim);

    @Mapping(source = "automobileId", target = "automobile")
    Claim toEntity(ClaimDTO claimDTO);

    default Claim fromId(Long id) {
        if (id == null) {
            return null;
        }
        Claim claim = new Claim();
        claim.setId(id);
        return claim;
    }
}
