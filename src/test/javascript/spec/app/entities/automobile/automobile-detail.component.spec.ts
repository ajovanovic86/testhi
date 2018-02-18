/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MehanicarTestModule } from '../../../test.module';
import { AutomobileDetailComponent } from '../../../../../../main/webapp/app/entities/automobile/automobile-detail.component';
import { AutomobileService } from '../../../../../../main/webapp/app/entities/automobile/automobile.service';
import { Automobile } from '../../../../../../main/webapp/app/entities/automobile/automobile.model';

describe('Component Tests', () => {

    describe('Automobile Management Detail Component', () => {
        let comp: AutomobileDetailComponent;
        let fixture: ComponentFixture<AutomobileDetailComponent>;
        let service: AutomobileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutomobileDetailComponent],
                providers: [
                    AutomobileService
                ]
            })
            .overrideTemplate(AutomobileDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutomobileDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutomobileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Automobile(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.automobile).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
