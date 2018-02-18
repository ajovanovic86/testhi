import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AutoTip } from './auto-tip.model';
import { AutoTipPopupService } from './auto-tip-popup.service';
import { AutoTipService } from './auto-tip.service';

@Component({
    selector: 'jhi-auto-tip-dialog',
    templateUrl: './auto-tip-dialog.component.html'
})
export class AutoTipDialogComponent implements OnInit {

    autoTip: AutoTip;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private autoTipService: AutoTipService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.autoTip.id !== undefined) {
            this.subscribeToSaveResponse(
                this.autoTipService.update(this.autoTip));
        } else {
            this.subscribeToSaveResponse(
                this.autoTipService.create(this.autoTip));
        }
    }

    private subscribeToSaveResponse(result: Observable<AutoTip>) {
        result.subscribe((res: AutoTip) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AutoTip) {
        this.eventManager.broadcast({ name: 'autoTipListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-auto-tip-popup',
    template: ''
})
export class AutoTipPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private autoTipPopupService: AutoTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.autoTipPopupService
                    .open(AutoTipDialogComponent as Component, params['id']);
            } else {
                this.autoTipPopupService
                    .open(AutoTipDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
