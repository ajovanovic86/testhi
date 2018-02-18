package mehanicar.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AutoTip entity.
 */
public class AutoTipDTO implements Serializable {

    private Long id;

    private String brandName;

    private String model;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AutoTipDTO autoTipDTO = (AutoTipDTO) o;
        if(autoTipDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), autoTipDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AutoTipDTO{" +
            "id=" + getId() +
            ", brandName='" + getBrandName() + "'" +
            ", model='" + getModel() + "'" +
            "}";
    }
}
