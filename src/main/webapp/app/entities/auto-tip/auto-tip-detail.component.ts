import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AutoTip } from './auto-tip.model';
import { AutoTipService } from './auto-tip.service';

@Component({
    selector: 'jhi-auto-tip-detail',
    templateUrl: './auto-tip-detail.component.html'
})
export class AutoTipDetailComponent implements OnInit, OnDestroy {

    autoTip: AutoTip;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private autoTipService: AutoTipService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAutoTips();
    }

    load(id) {
        this.autoTipService.find(id).subscribe((autoTip) => {
            this.autoTip = autoTip;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAutoTips() {
        this.eventSubscriber = this.eventManager.subscribe(
            'autoTipListModification',
            (response) => this.load(this.autoTip.id)
        );
    }
}
