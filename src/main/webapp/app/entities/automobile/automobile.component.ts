import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Automobile } from './automobile.model';
import { AutomobileService } from './automobile.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-automobile',
    templateUrl: './automobile.component.html'
})
export class AutomobileComponent implements OnInit, OnDestroy {
automobiles: Automobile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private automobileService: AutomobileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.automobileService.query().subscribe(
            (res: ResponseWrapper) => {
                this.automobiles = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAutomobiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Automobile) {
        return item.id;
    }
    registerChangeInAutomobiles() {
        this.eventSubscriber = this.eventManager.subscribe('automobileListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
