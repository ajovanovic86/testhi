/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MehanicarTestModule } from '../../../test.module';
import { AutoTipDialogComponent } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip-dialog.component';
import { AutoTipService } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip.service';
import { AutoTip } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip.model';

describe('Component Tests', () => {

    describe('AutoTip Management Dialog Component', () => {
        let comp: AutoTipDialogComponent;
        let fixture: ComponentFixture<AutoTipDialogComponent>;
        let service: AutoTipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutoTipDialogComponent],
                providers: [
                    AutoTipService
                ]
            })
            .overrideTemplate(AutoTipDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutoTipDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutoTipService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AutoTip(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.autoTip = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'autoTipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AutoTip();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.autoTip = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'autoTipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
