import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Automobile } from './automobile.model';
import { AutomobileService } from './automobile.service';

@Component({
    selector: 'jhi-automobile-detail',
    templateUrl: './automobile-detail.component.html'
})
export class AutomobileDetailComponent implements OnInit, OnDestroy {

    automobile: Automobile;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private automobileService: AutomobileService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAutomobiles();
    }

    load(id) {
        this.automobileService.find(id).subscribe((automobile) => {
            this.automobile = automobile;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAutomobiles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'automobileListModification',
            (response) => this.load(this.automobile.id)
        );
    }
}
