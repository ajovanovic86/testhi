import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Auto } from './auto.model';
import { AutoPopupService } from './auto-popup.service';
import { AutoService } from './auto.service';

@Component({
    selector: 'jhi-auto-dialog',
    templateUrl: './auto-dialog.component.html'
})
export class AutoDialogComponent implements OnInit {

    auto: Auto;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private autoService: AutoService,
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
        if (this.auto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.autoService.update(this.auto));
        } else {
            this.subscribeToSaveResponse(
                this.autoService.create(this.auto));
        }
    }

    private subscribeToSaveResponse(result: Observable<Auto>) {
        result.subscribe((res: Auto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Auto) {
        this.eventManager.broadcast({ name: 'autoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-auto-popup',
    template: ''
})
export class AutoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private autoPopupService: AutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.autoPopupService
                    .open(AutoDialogComponent as Component, params['id']);
            } else {
                this.autoPopupService
                    .open(AutoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
