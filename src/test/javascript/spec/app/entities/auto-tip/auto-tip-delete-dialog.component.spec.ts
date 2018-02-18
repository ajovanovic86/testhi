/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MehanicarTestModule } from '../../../test.module';
import { AutoTipDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip-delete-dialog.component';
import { AutoTipService } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip.service';

describe('Component Tests', () => {

    describe('AutoTip Management Delete Component', () => {
        let comp: AutoTipDeleteDialogComponent;
        let fixture: ComponentFixture<AutoTipDeleteDialogComponent>;
        let service: AutoTipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutoTipDeleteDialogComponent],
                providers: [
                    AutoTipService
                ]
            })
            .overrideTemplate(AutoTipDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutoTipDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutoTipService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
