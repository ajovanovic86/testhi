import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AutoTip } from './auto-tip.model';
import { AutoTipService } from './auto-tip.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-auto-tip',
    templateUrl: './auto-tip.component.html'
})
export class AutoTipComponent implements OnInit, OnDestroy {
autoTips: AutoTip[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private autoTipService: AutoTipService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.autoTipService.query().subscribe(
            (res: ResponseWrapper) => {
                this.autoTips = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAutoTips();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AutoTip) {
        return item.id;
    }
    registerChangeInAutoTips() {
        this.eventSubscriber = this.eventManager.subscribe('autoTipListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
