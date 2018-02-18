/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MehanicarTestModule } from '../../../test.module';
import { AutomobileComponent } from '../../../../../../main/webapp/app/entities/automobile/automobile.component';
import { AutomobileService } from '../../../../../../main/webapp/app/entities/automobile/automobile.service';
import { Automobile } from '../../../../../../main/webapp/app/entities/automobile/automobile.model';

describe('Component Tests', () => {

    describe('Automobile Management Component', () => {
        let comp: AutomobileComponent;
        let fixture: ComponentFixture<AutomobileComponent>;
        let service: AutomobileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutomobileComponent],
                providers: [
                    AutomobileService
                ]
            })
            .overrideTemplate(AutomobileComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutomobileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutomobileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Automobile(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.automobiles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
