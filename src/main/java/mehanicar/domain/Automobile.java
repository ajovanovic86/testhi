package mehanicar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Automobile.
 */
@Entity
@Table(name = "automobile")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Automobile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "color")
    private String color;

    @OneToOne
    @JoinColumn(unique = true)
    private AutoTip autoTip;

    @OneToMany(mappedBy = "automobile")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Claim> claims = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public Automobile color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public AutoTip getAutoTip() {
        return autoTip;
    }

    public Automobile autoTip(AutoTip autoTip) {
        this.autoTip = autoTip;
        return this;
    }

    public void setAutoTip(AutoTip autoTip) {
        this.autoTip = autoTip;
    }

    public Set<Claim> getClaims() {
        return claims;
    }

    public Automobile claims(Set<Claim> claims) {
        this.claims = claims;
        return this;
    }

    public Automobile addClaim(Claim claim) {
        this.claims.add(claim);
        claim.setAutomobile(this);
        return this;
    }

    public Automobile removeClaim(Claim claim) {
        this.claims.remove(claim);
        claim.setAutomobile(null);
        return this;
    }

    public void setClaims(Set<Claim> claims) {
        this.claims = claims;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Automobile automobile = (Automobile) o;
        if (automobile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), automobile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Automobile{" +
            "id=" + getId() +
            ", color='" + getColor() + "'" +
            "}";
    }
}
