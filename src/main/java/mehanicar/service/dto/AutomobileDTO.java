package mehanicar.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Automobile entity.
 */
public class AutomobileDTO implements Serializable {

    private Long id;

    private String color;

    private Long autoTipId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getAutoTipId() {
        return autoTipId;
    }

    public void setAutoTipId(Long autoTipId) {
        this.autoTipId = autoTipId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AutomobileDTO automobileDTO = (AutomobileDTO) o;
        if(automobileDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), automobileDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AutomobileDTO{" +
            "id=" + getId() +
            ", color='" + getColor() + "'" +
            "}";
    }
}
