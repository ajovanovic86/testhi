import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Auto } from './auto.model';
import { AutoService } from './auto.service';

@Component({
    selector: 'jhi-auto-detail',
    templateUrl: './auto-detail.component.html'
})
export class AutoDetailComponent implements OnInit, OnDestroy {

    auto: Auto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private autoService: AutoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAutos();
    }

    load(id) {
        this.autoService.find(id).subscribe((auto) => {
            this.auto = auto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAutos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'autoListModification',
            (response) => this.load(this.auto.id)
        );
    }
}
