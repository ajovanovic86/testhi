import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Auto } from './auto.model';
import { AutoPopupService } from './auto-popup.service';
import { AutoService } from './auto.service';

@Component({
    selector: 'jhi-auto-delete-dialog',
    templateUrl: './auto-delete-dialog.component.html'
})
export class AutoDeleteDialogComponent {

    auto: Auto;

    constructor(
        private autoService: AutoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.autoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'autoListModification',
                content: 'Deleted an auto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-auto-delete-popup',
    template: ''
})
export class AutoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private autoPopupService: AutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.autoPopupService
                .open(AutoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
