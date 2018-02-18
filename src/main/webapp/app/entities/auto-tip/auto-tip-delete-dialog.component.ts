import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AutoTip } from './auto-tip.model';
import { AutoTipPopupService } from './auto-tip-popup.service';
import { AutoTipService } from './auto-tip.service';

@Component({
    selector: 'jhi-auto-tip-delete-dialog',
    templateUrl: './auto-tip-delete-dialog.component.html'
})
export class AutoTipDeleteDialogComponent {

    autoTip: AutoTip;

    constructor(
        private autoTipService: AutoTipService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.autoTipService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'autoTipListModification',
                content: 'Deleted an autoTip'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-auto-tip-delete-popup',
    template: ''
})
export class AutoTipDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private autoTipPopupService: AutoTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.autoTipPopupService
                .open(AutoTipDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
