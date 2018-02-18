import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Claim } from './claim.model';
import { ClaimService } from './claim.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-claim',
    templateUrl: './claim.component.html'
})
export class ClaimComponent implements OnInit, OnDestroy {
claims: Claim[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private claimService: ClaimService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.claimService.query().subscribe(
            (res: ResponseWrapper) => {
                this.claims = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClaims();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Claim) {
        return item.id;
    }
    registerChangeInClaims() {
        this.eventSubscriber = this.eventManager.subscribe('claimListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
