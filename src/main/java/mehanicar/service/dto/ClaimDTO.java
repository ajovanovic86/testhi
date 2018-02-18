package mehanicar.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Claim entity.
 */
public class ClaimDTO implements Serializable {

    private Long id;

    private String description;

    private Instant date;

    private Long automobileId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getAutomobileId() {
        return automobileId;
    }

    public void setAutomobileId(Long automobileId) {
        this.automobileId = automobileId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClaimDTO claimDTO = (ClaimDTO) o;
        if(claimDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), claimDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClaimDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
