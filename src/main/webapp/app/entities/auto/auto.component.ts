import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Auto } from './auto.model';
import { AutoService } from './auto.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-auto',
    templateUrl: './auto.component.html'
})
export class AutoComponent implements OnInit, OnDestroy {
autos: Auto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private autoService: AutoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.autoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.autos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAutos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Auto) {
        return item.id;
    }
    registerChangeInAutos() {
        this.eventSubscriber = this.eventManager.subscribe('autoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
