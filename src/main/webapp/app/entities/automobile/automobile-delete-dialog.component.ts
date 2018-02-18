import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Automobile } from './automobile.model';
import { AutomobilePopupService } from './automobile-popup.service';
import { AutomobileService } from './automobile.service';

@Component({
    selector: 'jhi-automobile-delete-dialog',
    templateUrl: './automobile-delete-dialog.component.html'
})
export class AutomobileDeleteDialogComponent {

    automobile: Automobile;

    constructor(
        private automobileService: AutomobileService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.automobileService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'automobileListModification',
                content: 'Deleted an automobile'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-automobile-delete-popup',
    template: ''
})
export class AutomobileDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private automobilePopupService: AutomobilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.automobilePopupService
                .open(AutomobileDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
