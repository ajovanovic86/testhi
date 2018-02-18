import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Automobile } from './automobile.model';
import { AutomobilePopupService } from './automobile-popup.service';
import { AutomobileService } from './automobile.service';
import { AutoTip, AutoTipService } from '../auto-tip';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-automobile-dialog',
    templateUrl: './automobile-dialog.component.html'
})
export class AutomobileDialogComponent implements OnInit {

    automobile: Automobile;
    isSaving: boolean;

    autotips: AutoTip[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private automobileService: AutomobileService,
        private autoTipService: AutoTipService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.autoTipService
            .query({filter: 'automobile-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.automobile.autoTipId) {
                    this.autotips = res.json;
                } else {
                    this.autoTipService
                        .find(this.automobile.autoTipId)
                        .subscribe((subRes: AutoTip) => {
                            this.autotips = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.automobile.id !== undefined) {
            this.subscribeToSaveResponse(
                this.automobileService.update(this.automobile));
        } else {
            this.subscribeToSaveResponse(
                this.automobileService.create(this.automobile));
        }
    }

    private subscribeToSaveResponse(result: Observable<Automobile>) {
        result.subscribe((res: Automobile) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Automobile) {
        this.eventManager.broadcast({ name: 'automobileListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAutoTipById(index: number, item: AutoTip) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-automobile-popup',
    template: ''
})
export class AutomobilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private automobilePopupService: AutomobilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.automobilePopupService
                    .open(AutomobileDialogComponent as Component, params['id']);
            } else {
                this.automobilePopupService
                    .open(AutomobileDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
