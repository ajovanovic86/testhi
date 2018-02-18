import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Claim } from './claim.model';
import { ClaimPopupService } from './claim-popup.service';
import { ClaimService } from './claim.service';
import { Automobile, AutomobileService } from '../automobile';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-claim-dialog',
    templateUrl: './claim-dialog.component.html'
})
export class ClaimDialogComponent implements OnInit {

    claim: Claim;
    isSaving: boolean;

    automobiles: Automobile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private claimService: ClaimService,
        private automobileService: AutomobileService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.automobileService.query()
            .subscribe((res: ResponseWrapper) => { this.automobiles = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.claim.id !== undefined) {
            this.subscribeToSaveResponse(
                this.claimService.update(this.claim));
        } else {
            this.subscribeToSaveResponse(
                this.claimService.create(this.claim));
        }
    }

    private subscribeToSaveResponse(result: Observable<Claim>) {
        result.subscribe((res: Claim) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Claim) {
        this.eventManager.broadcast({ name: 'claimListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAutomobileById(index: number, item: Automobile) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-claim-popup',
    template: ''
})
export class ClaimPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private claimPopupService: ClaimPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.claimPopupService
                    .open(ClaimDialogComponent as Component, params['id']);
            } else {
                this.claimPopupService
                    .open(ClaimDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
