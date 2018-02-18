/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MehanicarTestModule } from '../../../test.module';
import { AutomobileDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/automobile/automobile-delete-dialog.component';
import { AutomobileService } from '../../../../../../main/webapp/app/entities/automobile/automobile.service';

describe('Component Tests', () => {

    describe('Automobile Management Delete Component', () => {
        let comp: AutomobileDeleteDialogComponent;
        let fixture: ComponentFixture<AutomobileDeleteDialogComponent>;
        let service: AutomobileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutomobileDeleteDialogComponent],
                providers: [
                    AutomobileService
                ]
            })
            .overrideTemplate(AutomobileDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutomobileDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutomobileService);
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
