/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MehanicarTestModule } from '../../../test.module';
import { AutomobileDialogComponent } from '../../../../../../main/webapp/app/entities/automobile/automobile-dialog.component';
import { AutomobileService } from '../../../../../../main/webapp/app/entities/automobile/automobile.service';
import { Automobile } from '../../../../../../main/webapp/app/entities/automobile/automobile.model';
import { AutoTipService } from '../../../../../../main/webapp/app/entities/auto-tip';

describe('Component Tests', () => {

    describe('Automobile Management Dialog Component', () => {
        let comp: AutomobileDialogComponent;
        let fixture: ComponentFixture<AutomobileDialogComponent>;
        let service: AutomobileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutomobileDialogComponent],
                providers: [
                    AutoTipService,
                    AutomobileService
                ]
            })
            .overrideTemplate(AutomobileDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutomobileDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutomobileService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Automobile(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.automobile = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'automobileListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Automobile();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.automobile = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'automobileListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
